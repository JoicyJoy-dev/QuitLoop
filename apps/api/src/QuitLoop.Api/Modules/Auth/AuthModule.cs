using System.Diagnostics.CodeAnalysis;
using System.Net.Mail;
using Dapper;
using Microsoft.Extensions.Options;
using Npgsql;
using QuitLoop.Api.Shared.Regional;

namespace QuitLoop.Api.Modules.Auth;

public static class AuthModule
{
    public const string RoutePrefix = "/auth";
    private const int MinPasswordLength = 8;
    private const int MaxPasswordLength = 128;
    private const int MaxEmailLength = 320;
    private const int MaxDisplayNameLength = 80;
    private const string ForgotMessage = "If an account exists for that email, we sent reset instructions.";

    public static IServiceCollection AddAuthModule(this IServiceCollection services)
    {
        services
            .AddOptions<AuthOptions>()
            .BindConfiguration(AuthOptions.SectionName)
            .ValidateDataAnnotations()
            .Validate(static options => options.IsValid(), "Auth options must include a valid public web URL and session lifetimes.")
            .ValidateOnStart();

        services.AddScoped<RequireAuthFilter>();
        return services;
    }

    public static WebApplication MapAuthModule(this WebApplication app)
    {
        var dummyPasswordHash = PasswordCrypto.Hash("quitloop-unknown-user");
        var auth = app.MapGroup(RoutePrefix).WithTags("Auth");

        auth.MapPost("/signup", SignUpAsync);
        auth.MapPost("/login", (LoginRequest request, NpgsqlDataSource db, IOptions<AuthOptions> options, CancellationToken cancellationToken)
            => LoginAsync(request, db, options, dummyPasswordHash, cancellationToken));
        auth.MapPost("/forgot-password", ForgotPasswordAsync);
        auth.MapPost("/reset-password", ResetPasswordAsync);
        auth.MapGet("/me", (HttpContext http) => Results.Ok(ToUserResponse(RequireAuthFilter.Get(http))))
            .AddEndpointFilter<RequireAuthFilter>();
        auth.MapPost("/logout", LogoutAsync)
            .AddEndpointFilter<RequireAuthFilter>();

        return app;
    }

    private static async Task<IResult> SignUpAsync(
        SignUpRequest request,
        NpgsqlDataSource dataSource,
        IOptions<AuthOptions> options,
        IOptions<RegionalOptions> regional,
        CancellationToken cancellationToken)
    {
        if (!TryNormalizeEmail(request.Email, out var email, out var emailNormalized, out var emailError))
        {
            return Error(emailError);
        }

        if (!TryValidatePassword(request.Password, out var password, out var passwordError))
        {
            return Error(passwordError);
        }

        var displayName = NormalizeDisplayName(request.DisplayName, emailNormalized);

        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        var region = await ResolveRegionAsync(connection, request.CountryCode, regional.Value, cancellationToken);
        if (region is null)
        {
            return Error("That country is not available yet.");
        }

        var passwordHash = PasswordCrypto.Hash(password);
        try
        {
            var user = await connection.QuerySingleAsync<UserRow>(
                new CommandDefinition(
                    """
                    INSERT INTO users (
                        email, email_normalized, display_name, password_hash,
                        country_code, currency_code, language_code, time_zone, unit_system
                    )
                    VALUES (
                        @email, @emailNormalized, @displayName, @passwordHash,
                        @countryCode, @currencyCode, @languageCode, @timeZone, @unitSystem
                    )
                    RETURNING
                        id, email, email_normalized, display_name, password_hash,
                        country_code, currency_code, language_code, time_zone, unit_system
                    """,
                    new
                    {
                        email,
                        emailNormalized,
                        displayName,
                        passwordHash,
                        countryCode = region.CountryCode,
                        currencyCode = region.CurrencyCode,
                        languageCode = region.DefaultLanguageCode,
                        timeZone = region.DefaultTimeZone,
                        unitSystem = region.DefaultUnitSystem
                    },
                    cancellationToken: cancellationToken));

            return Results.Created($"{RoutePrefix}/me", await IssueSessionAsync(connection, user, options.Value, cancellationToken));
        }
        catch (PostgresException ex) when (ex.SqlState == PostgresErrorCodes.UniqueViolation)
        {
            return Results.Json(new { error = "An account with this email already exists." }, statusCode: StatusCodes.Status409Conflict);
        }
    }

    private static async Task<IResult> LoginAsync(
        LoginRequest request,
        NpgsqlDataSource dataSource,
        IOptions<AuthOptions> options,
        string dummyPasswordHash,
        CancellationToken cancellationToken)
    {
        if (!TryNormalizeEmail(request.Email, out _, out var emailNormalized, out var emailError))
        {
            return Error(emailError);
        }

        if (string.IsNullOrEmpty(request.Password))
        {
            return Error("Enter your password.");
        }

        var password = request.Password;

        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        var user = await connection.QuerySingleOrDefaultAsync<UserRow>(
            new CommandDefinition(
                """
                SELECT
                    id, email, email_normalized, display_name, password_hash,
                    country_code, currency_code, language_code, time_zone, unit_system
                FROM users
                WHERE email_normalized = @emailNormalized
                """,
                new { emailNormalized },
                cancellationToken: cancellationToken));

        var hash = user?.PasswordHash ?? dummyPasswordHash;
        if (!PasswordCrypto.Verify(password, hash) || user is null)
        {
            return Results.Json(new { error = "Invalid email or password." }, statusCode: StatusCodes.Status401Unauthorized);
        }

        return Results.Ok(await IssueSessionAsync(connection, user, options.Value, cancellationToken));
    }

    private static async Task<IResult> ForgotPasswordAsync(
        ForgotPasswordRequest request,
        IHostEnvironment environment,
        NpgsqlDataSource dataSource,
        IOptions<AuthOptions> options,
        ILoggerFactory loggerFactory,
        CancellationToken cancellationToken)
    {
        if (!TryNormalizeEmail(request.Email, out var email, out var emailNormalized, out _))
        {
            return Results.Ok(new ForgotPasswordResponse(ForgotMessage, null));
        }

        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        var userId = await connection.QuerySingleOrDefaultAsync<Guid?>(
            new CommandDefinition(
                "SELECT id FROM users WHERE email_normalized = @emailNormalized",
                new { emailNormalized },
                cancellationToken: cancellationToken));

        string? devResetToken = null;
        if (userId is { } id)
        {
            var token = PasswordCrypto.CreateToken();
            var expiresAt = DateTimeOffset.UtcNow.AddHours(options.Value.PasswordResetHours);
            await connection.ExecuteAsync(
                new CommandDefinition(
                    """
                    UPDATE password_reset_tokens
                    SET used_at = now()
                    WHERE user_id = @id AND used_at IS NULL;

                    INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
                    VALUES (@id, @tokenHash, @expiresAt);
                    """,
                    new { id, tokenHash = PasswordCrypto.HashToken(token), expiresAt },
                    cancellationToken: cancellationToken));

            var resetUrl = BuildResetUrl(options.Value.PublicWebBaseUrl, token);
            loggerFactory.CreateLogger("QuitLoop.Api.Modules.Auth")
                .LogInformation("Password reset requested for {Email}. Reset URL: {ResetUrl}", email, resetUrl);

            if (environment.IsDevelopment())
            {
                devResetToken = token;
            }
        }

        return Results.Ok(new ForgotPasswordResponse(ForgotMessage, devResetToken));
    }

    private static async Task<IResult> ResetPasswordAsync(
        ResetPasswordRequest request,
        NpgsqlDataSource dataSource,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Token))
        {
            return Error("That reset link is invalid or has expired.");
        }

        if (!TryValidatePassword(request.Password, out var password, out var passwordError))
        {
            return Error(passwordError);
        }

        var tokenHash = PasswordCrypto.HashToken(request.Token.Trim());
        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var userId = await connection.QuerySingleOrDefaultAsync<Guid?>(
            new CommandDefinition(
                """
                SELECT user_id
                FROM password_reset_tokens
                WHERE token_hash = @tokenHash
                  AND used_at IS NULL
                  AND expires_at > now()
                """,
                new { tokenHash },
                transaction,
                cancellationToken: cancellationToken));

        if (userId is null)
        {
            return Error("That reset link is invalid or has expired.");
        }

        await connection.ExecuteAsync(
            new CommandDefinition(
                """
                UPDATE users
                SET password_hash = @passwordHash, updated_at = now()
                WHERE id = @userId;

                UPDATE password_reset_tokens
                SET used_at = now()
                WHERE token_hash = @tokenHash;

                UPDATE auth_sessions
                SET revoked_at = now()
                WHERE user_id = @userId AND revoked_at IS NULL;
                """,
                new { userId, passwordHash = PasswordCrypto.Hash(request.Password), tokenHash },
                transaction,
                cancellationToken: cancellationToken));

        await transaction.CommitAsync(cancellationToken);
        return Results.Ok(new { message = "Your password has been updated. You can sign in now." });
    }

    private static async Task<IResult> LogoutAsync(HttpContext http, NpgsqlDataSource dataSource, CancellationToken cancellationToken)
    {
        var user = RequireAuthFilter.Get(http);
        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        await connection.ExecuteAsync(
            new CommandDefinition(
                """
                UPDATE auth_sessions
                SET revoked_at = now()
                WHERE id = @sessionId AND revoked_at IS NULL
                """,
                new { sessionId = user.SessionId },
                cancellationToken: cancellationToken));
        return Results.NoContent();
    }

    private static async Task<AuthSessionResponse> IssueSessionAsync(
        NpgsqlConnection connection,
        UserRow user,
        AuthOptions options,
        CancellationToken cancellationToken)
    {
        var token = PasswordCrypto.CreateToken();
        var expiresAt = DateTimeOffset.UtcNow.AddDays(options.SessionDays);
        await connection.ExecuteAsync(
            new CommandDefinition(
                """
                INSERT INTO auth_sessions (user_id, token_hash, expires_at)
                VALUES (@userId, @tokenHash, @expiresAt)
                """,
                new { userId = user.Id, tokenHash = PasswordCrypto.HashToken(token), expiresAt },
                cancellationToken: cancellationToken));

        return new AuthSessionResponse(token, expiresAt, ToUserResponse(user));
    }

    private static async Task<RegionalRow?> ResolveRegionAsync(
        NpgsqlConnection connection,
        string? requestedCountry,
        RegionalOptions defaults,
        CancellationToken cancellationToken)
    {
        var country = string.IsNullOrWhiteSpace(requestedCountry)
            ? defaults.DefaultCountryCode
            : requestedCountry.Trim().ToUpperInvariant();

        if (!IsoCountryCode.IsValid(country))
        {
            return null;
        }

        return await connection.QuerySingleOrDefaultAsync<RegionalRow>(
            new CommandDefinition(
                """
                SELECT
                    country_code,
                    currency_code,
                    default_language_code,
                    default_time_zone,
                    default_unit_system
                FROM regional_configurations
                WHERE country_code = @country AND is_enabled = TRUE
                """,
                new { country },
                cancellationToken: cancellationToken));
    }

    private static AuthUserResponse ToUserResponse(UserRow user) =>
        new(
            user.Id,
            user.Email,
            string.IsNullOrWhiteSpace(user.DisplayName) ? DisplayNameFromEmail(user.Email) : user.DisplayName.Trim(),
            user.CountryCode,
            user.CurrencyCode,
            user.LanguageCode,
            user.TimeZone,
            user.UnitSystem);

    private static AuthUserResponse ToUserResponse(CurrentUser user) =>
        new(
            user.Id,
            user.Email,
            user.DisplayName,
            user.CountryCode,
            user.CurrencyCode,
            user.LanguageCode,
            user.TimeZone,
            user.UnitSystem);

    private static bool TryNormalizeEmail(
        string? value,
        [NotNullWhen(true)] out string email,
        [NotNullWhen(true)] out string emailNormalized,
        out string error)
    {
        email = "";
        emailNormalized = "";
        error = "";
        var trimmed = value?.Trim() ?? "";
        if (trimmed.Length is 0 or > MaxEmailLength || !MailAddress.TryCreate(trimmed, out var address))
        {
            error = "Enter a valid email address.";
            return false;
        }

        email = address.Address;
        emailNormalized = email.ToLowerInvariant();
        return true;
    }

    private static bool TryValidatePassword(
        string? password,
        [NotNullWhen(true)] out string validated,
        out string error)
    {
        validated = password ?? "";
        error = "";
        if (string.IsNullOrEmpty(password) || password.Length < MinPasswordLength)
        {
            error = $"Password must be at least {MinPasswordLength} characters.";
            return false;
        }

        if (password.Length > MaxPasswordLength)
        {
            error = $"Password must be at most {MaxPasswordLength} characters.";
            return false;
        }

        return true;
    }

    private static string NormalizeDisplayName(string? displayName, string emailNormalized)
    {
        var trimmed = displayName?.Trim() ?? "";
        if (trimmed.Length > MaxDisplayNameLength)
        {
            trimmed = trimmed[..MaxDisplayNameLength].Trim();
        }

        return string.IsNullOrWhiteSpace(trimmed) ? DisplayNameFromEmail(emailNormalized) : trimmed;
    }

    private static string DisplayNameFromEmail(string email)
    {
        var local = email.Split('@')[0].Replace('.', ' ').Replace('_', ' ').Replace('-', ' ').Trim();
        return string.IsNullOrWhiteSpace(local) ? "there" : local;
    }

    private static string BuildResetUrl(string publicWebBaseUrl, string token)
    {
        var baseUrl = publicWebBaseUrl.TrimEnd('/');
        return $"{baseUrl}/reset-password/?token={Uri.EscapeDataString(token)}";
    }

    private static IResult Error(string message) =>
        Results.Json(new { error = message }, statusCode: StatusCodes.Status400BadRequest);
}

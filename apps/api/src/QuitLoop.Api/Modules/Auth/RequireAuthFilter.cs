using Dapper;
using Npgsql;

namespace QuitLoop.Api.Modules.Auth;

internal sealed class RequireAuthFilter(NpgsqlDataSource dataSource) : IEndpointFilter
{
    public const string ItemKey = "QuitLoop.CurrentUser";

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var http = context.HttpContext;
        if (!TryReadBearerToken(http, out var token))
        {
            return Results.Json(new { error = "Sign in to continue." }, statusCode: StatusCodes.Status401Unauthorized);
        }

        var tokenHash = PasswordCrypto.HashToken(token);
        await using var connection = await dataSource.OpenConnectionAsync(http.RequestAborted);
        var user = await connection.QuerySingleOrDefaultAsync<CurrentUser>(
            new CommandDefinition(
                """
                SELECT
                    u.id,
                    s.id AS session_id,
                    u.email,
                    COALESCE(NULLIF(u.display_name, ''), split_part(u.email, '@', 1)) AS display_name,
                    u.country_code,
                    u.currency_code,
                    u.language_code,
                    u.time_zone,
                    u.unit_system
                FROM auth_sessions s
                JOIN users u ON u.id = s.user_id
                WHERE s.token_hash = @tokenHash
                  AND s.revoked_at IS NULL
                  AND s.expires_at > now()
                """,
                new { tokenHash },
                cancellationToken: http.RequestAborted));

        if (user is null)
        {
            return Results.Json(new { error = "Sign in to continue." }, statusCode: StatusCodes.Status401Unauthorized);
        }

        http.Items[ItemKey] = user;
        return await next(context);
    }

    public static CurrentUser Get(HttpContext http) =>
        http.Items[ItemKey] as CurrentUser
        ?? throw new InvalidOperationException("RequireAuthFilter must run before reading the current user.");

    public static bool TryReadBearerToken(HttpContext http, out string token)
    {
        token = "";
        var header = http.Request.Headers.Authorization.ToString();
        const string prefix = "Bearer ";
        if (header.Length <= prefix.Length || !header.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        token = header[prefix.Length..].Trim();
        return token.Length > 0;
    }
}

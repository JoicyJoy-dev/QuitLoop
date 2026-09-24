namespace QuitLoop.Api.Modules.Auth;

internal sealed record SignUpRequest(string? Email, string? Password, string? DisplayName, string? CountryCode);

internal sealed record LoginRequest(string? Email, string? Password);

internal sealed record ForgotPasswordRequest(string? Email);

internal sealed record ResetPasswordRequest(string? Token, string? Password);

internal sealed record AuthUserResponse(
    Guid Id,
    string Email,
    string DisplayName,
    string CountryCode,
    string CurrencyCode,
    string LanguageCode,
    string TimeZone,
    string UnitSystem);

internal sealed record AuthSessionResponse(
    string Token,
    DateTimeOffset ExpiresAt,
    AuthUserResponse User);

internal sealed record ForgotPasswordResponse(string Message, string? DevResetToken);

internal sealed record UserRow(
    Guid Id,
    string Email,
    string EmailNormalized,
    string? DisplayName,
    string PasswordHash,
    string CountryCode,
    string CurrencyCode,
    string LanguageCode,
    string TimeZone,
    string UnitSystem);

internal sealed record RegionalRow(
    string CountryCode,
    string CurrencyCode,
    string DefaultLanguageCode,
    string DefaultTimeZone,
    string DefaultUnitSystem);

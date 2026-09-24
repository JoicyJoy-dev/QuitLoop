namespace QuitLoop.Api.Modules.Auth;

public sealed record CurrentUser(
    Guid Id,
    Guid SessionId,
    string Email,
    string DisplayName,
    string CountryCode,
    string CurrencyCode,
    string LanguageCode,
    string TimeZone,
    string UnitSystem);

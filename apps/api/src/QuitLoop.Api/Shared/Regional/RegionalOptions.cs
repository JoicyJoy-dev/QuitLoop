using System.ComponentModel.DataAnnotations;

namespace QuitLoop.Api.Shared.Regional;

/// <summary>
/// Deploy-time regional defaults. These are environment configuration, not business rules.
/// A user's stored country, currency, language, time zone and units take precedence after onboarding.
/// </summary>
public sealed class RegionalOptions
{
    public const string SectionName = "Regional";

    [Required, MinLength(2), MaxLength(2)]
    public string DefaultCountryCode { get; set; } = "";

    [Required, MinLength(3), MaxLength(3)]
    public string DefaultCurrencyCode { get; set; } = "";

    [Required]
    public string DefaultLanguageCode { get; set; } = "";

    [Required]
    public string DefaultTimeZone { get; set; } = "";

    [Required]
    public string DefaultUnitSystem { get; set; } = "";

    public bool IsValid()
    {
        return IsoCountryCode.IsValid(DefaultCountryCode)
            && IsoCurrencyCode.IsValid(DefaultCurrencyCode)
            && LanguageTag.IsValid(DefaultLanguageCode)
            && IanaTimeZone.IsValid(DefaultTimeZone)
            && UnitSystem.IsValid(DefaultUnitSystem);
    }
}

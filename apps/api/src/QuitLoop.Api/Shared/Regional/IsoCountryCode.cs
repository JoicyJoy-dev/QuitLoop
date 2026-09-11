namespace QuitLoop.Api.Shared.Regional;

/// <summary>ISO 3166-1 alpha-2 country code (e.g. GB, US). Not the informal code "UK".</summary>
public static class IsoCountryCode
{
    public static bool IsValid(string? value)
    {
        return value is { Length: 2 }
            && char.IsAsciiLetter(value[0])
            && char.IsAsciiLetter(value[1]);
    }

    public static string Normalize(string value)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(value);
        if (!IsValid(value))
        {
            throw new ArgumentException("Country code must be ISO 3166-1 alpha-2.", nameof(value));
        }

        return value.ToUpperInvariant();
    }
}

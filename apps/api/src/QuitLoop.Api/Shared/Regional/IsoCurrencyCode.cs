namespace QuitLoop.Api.Shared.Regional;

/// <summary>ISO 4217 currency code (e.g. GBP, USD, EUR).</summary>
public static class IsoCurrencyCode
{
    public static bool IsValid(string? value)
    {
        return value is { Length: 3 }
            && char.IsAsciiLetter(value[0])
            && char.IsAsciiLetter(value[1])
            && char.IsAsciiLetter(value[2]);
    }

    public static string Normalize(string value)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(value);
        if (!IsValid(value))
        {
            throw new ArgumentException("Currency code must be ISO 4217.", nameof(value));
        }

        return value.ToUpperInvariant();
    }
}

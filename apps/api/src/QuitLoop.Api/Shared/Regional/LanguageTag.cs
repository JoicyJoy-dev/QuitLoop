using System.Globalization;

namespace QuitLoop.Api.Shared.Regional;

/// <summary>BCP 47 language tag (e.g. en-GB, en-US, hi-IN).</summary>
public static class LanguageTag
{
    public static bool IsValid(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return false;
        }

        try
        {
            _ = CultureInfo.GetCultureInfo(value, predefinedOnly: true);
            return true;
        }
        catch (CultureNotFoundException)
        {
            return false;
        }
    }
}

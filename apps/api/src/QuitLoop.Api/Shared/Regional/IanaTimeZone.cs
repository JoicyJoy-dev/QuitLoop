namespace QuitLoop.Api.Shared.Regional;

/// <summary>IANA time zone identifier (e.g. Europe/London, America/New_York).</summary>
public static class IanaTimeZone
{
    public static bool IsValid(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return false;
        }

        try
        {
            _ = TimeZoneInfo.FindSystemTimeZoneById(value);
            return true;
        }
        catch (TimeZoneNotFoundException)
        {
            return false;
        }
        catch (InvalidTimeZoneException)
        {
            return false;
        }
    }
}

namespace QuitLoop.Api.Shared.Regional;

/// <summary>Measurement system for later health/usage displays. Not a country-specific enum.</summary>
public static class UnitSystem
{
    public const string Metric = "metric";
    public const string Imperial = "imperial";

    public static bool IsValid(string? value)
    {
        return value is Metric or Imperial;
    }
}

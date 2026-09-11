namespace QuitLoop.Api.Modules.UsageTracking;

public static class UsageTrackingModule
{
    public const string RoutePrefix = "/usage";

    public static IServiceCollection AddUsageTrackingModule(this IServiceCollection services) => services;

    public static WebApplication MapUsageTrackingModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("UsageTracking");
        return app;
    }
}

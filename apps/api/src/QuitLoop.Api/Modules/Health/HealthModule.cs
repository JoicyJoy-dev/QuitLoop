namespace QuitLoop.Api.Modules.Health;

public static class HealthModule
{
    // Distinct from the infrastructure probe at GET /health.
    public const string RoutePrefix = "/health-insights";

    public static IServiceCollection AddHealthModule(this IServiceCollection services) => services;

    public static WebApplication MapHealthModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("Health");
        return app;
    }
}

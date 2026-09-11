namespace QuitLoop.Api.Modules.Progress;

public static class ProgressModule
{
    public const string RoutePrefix = "/progress";

    public static IServiceCollection AddProgressModule(this IServiceCollection services) => services;

    public static WebApplication MapProgressModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("Progress");
        return app;
    }
}

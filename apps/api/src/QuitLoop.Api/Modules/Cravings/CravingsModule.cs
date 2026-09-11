namespace QuitLoop.Api.Modules.Cravings;

public static class CravingsModule
{
    public const string RoutePrefix = "/cravings";

    public static IServiceCollection AddCravingsModule(this IServiceCollection services) => services;

    public static WebApplication MapCravingsModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("Cravings");
        return app;
    }
}

namespace QuitLoop.Api.Modules.QuitPlans;

public static class QuitPlansModule
{
    public const string RoutePrefix = "/quit-plans";

    public static IServiceCollection AddQuitPlansModule(this IServiceCollection services) => services;

    public static WebApplication MapQuitPlansModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("QuitPlans");
        return app;
    }
}

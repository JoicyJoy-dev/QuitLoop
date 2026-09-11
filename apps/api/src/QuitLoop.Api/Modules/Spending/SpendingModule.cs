namespace QuitLoop.Api.Modules.Spending;

public static class SpendingModule
{
    public const string RoutePrefix = "/spending";

    public static IServiceCollection AddSpendingModule(this IServiceCollection services) => services;

    public static WebApplication MapSpendingModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("Spending");
        return app;
    }
}

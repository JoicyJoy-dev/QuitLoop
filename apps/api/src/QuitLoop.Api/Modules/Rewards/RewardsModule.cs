namespace QuitLoop.Api.Modules.Rewards;

public static class RewardsModule
{
    public const string RoutePrefix = "/rewards";

    public static IServiceCollection AddRewardsModule(this IServiceCollection services) => services;

    public static WebApplication MapRewardsModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("Rewards");
        return app;
    }
}

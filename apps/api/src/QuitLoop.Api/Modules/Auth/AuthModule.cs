namespace QuitLoop.Api.Modules.Auth;

public static class AuthModule
{
    public const string RoutePrefix = "/auth";

    public static IServiceCollection AddAuthModule(this IServiceCollection services) => services;

    public static WebApplication MapAuthModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("Auth");
        return app;
    }
}

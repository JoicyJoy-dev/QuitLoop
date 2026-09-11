namespace QuitLoop.Api.Modules.Users;

public static class UsersModule
{
    public const string RoutePrefix = "/users";

    public static IServiceCollection AddUsersModule(this IServiceCollection services) => services;

    public static WebApplication MapUsersModule(this WebApplication app)
    {
        app.MapGroup(RoutePrefix).WithTags("Users");
        return app;
    }
}

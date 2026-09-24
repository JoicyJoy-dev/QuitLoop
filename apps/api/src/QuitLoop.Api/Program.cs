using Dapper;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;
using Npgsql;
using QuitLoop.Api.Database;
using QuitLoop.Api.Modules.Auth;
using QuitLoop.Api.Modules.Cravings;
using QuitLoop.Api.Modules.Health;
using QuitLoop.Api.Modules.Progress;
using QuitLoop.Api.Modules.QuitPlans;
using QuitLoop.Api.Modules.Rewards;
using QuitLoop.Api.Modules.Spending;
using QuitLoop.Api.Modules.UsageTracking;
using QuitLoop.Api.Modules.Users;
using QuitLoop.Api.Shared.Regional;

DefaultTypeMap.MatchNamesWithUnderscores = true;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddOptions<RegionalOptions>()
    .Bind(builder.Configuration.GetSection(RegionalOptions.SectionName))
    .ValidateDataAnnotations()
    .Validate(static options => options.IsValid(), "Regional defaults must use ISO country/currency codes, a BCP 47 language, an IANA time zone, and a supported unit system.")
    .ValidateOnStart();

var connectionString = ResolveDatabaseConnectionString(builder.Configuration);

builder.Services.AddSingleton(NpgsqlDataSource.Create(connectionString));
builder.Services.AddSingleton<DatabaseMigrator>();

builder.Services.AddHealthChecks()
    .AddCheck("self", () => HealthCheckResult.Healthy(), tags: ["live"])
    .AddCheck<PostgresHealthCheck>("postgres", tags: ["ready"]);

builder.Services.AddOpenApi();

var allowedOrigins = builder.Configuration.GetSection("Auth:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:3000", "http://127.0.0.1:3000", "https://quitloop.org", "https://www.quitloop.org"];
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services
    .AddAuthModule()
    .AddUsersModule()
    .AddUsageTrackingModule()
    .AddQuitPlansModule()
    .AddCravingsModule()
    .AddSpendingModule()
    .AddProgressModule()
    .AddHealthModule()
    .AddRewardsModule();

var app = builder.Build();

await app.Services.GetRequiredService<DatabaseMigrator>().MigrateAsync();

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", (IOptions<RegionalOptions> regional) => Results.Ok(new
{
    name = "QuitLoop API",
    version = typeof(Program).Assembly.GetName().Version?.ToString() ?? "0.0.0",
    defaultRegion = new
    {
        regional.Value.DefaultCountryCode,
        regional.Value.DefaultCurrencyCode,
        regional.Value.DefaultLanguageCode,
        regional.Value.DefaultTimeZone,
        regional.Value.DefaultUnitSystem
    }
}))
.WithTags("Meta");

app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = HealthCheckJsonWriter.WriteAsync
});

app.MapAuthModule();
app.MapUsersModule();
app.MapUsageTrackingModule();
app.MapQuitPlansModule();
app.MapCravingsModule();
app.MapSpendingModule();
app.MapProgressModule();
app.MapHealthModule();
app.MapRewardsModule();

app.Run();

static string ResolveDatabaseConnectionString(IConfiguration config)
{
    var host = config["POSTGRES_HOST"];
    var password = config["POSTGRES_PASSWORD"];
    if (!string.IsNullOrWhiteSpace(host) && !string.IsNullOrWhiteSpace(password))
    {
        var port = string.IsNullOrWhiteSpace(config["POSTGRES_PORT"]) ? "5432" : config["POSTGRES_PORT"]!;
        var database = config["POSTGRES_DB"] ?? "quitloop";
        var username = config["POSTGRES_USER"] ?? "quitloop";
        return $"Host={host};Port={port};Database={database};Username={username};Password={password}";
    }

    var configured = config.GetConnectionString("Database");
    if (!string.IsNullOrWhiteSpace(configured))
    {
        return configured;
    }

    throw new InvalidOperationException(
        "Database connection is not configured. Set POSTGRES_HOST and POSTGRES_PASSWORD, or ConnectionStrings:Database.");
}

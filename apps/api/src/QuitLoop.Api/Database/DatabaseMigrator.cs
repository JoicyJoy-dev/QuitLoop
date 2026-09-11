using Dapper;
using Npgsql;

namespace QuitLoop.Api.Database;

public sealed class DatabaseMigrator(NpgsqlDataSource dataSource, ILogger<DatabaseMigrator> logger)
{
    private static readonly System.Text.RegularExpressions.Regex MigrationFileName =
        new(@"^\d{3}_[a-z0-9_]+\.sql$", System.Text.RegularExpressions.RegexOptions.Compiled);

    public async Task MigrateAsync(CancellationToken cancellationToken = default)
    {
        var migrationsDirectory = Path.Combine(AppContext.BaseDirectory, "Migrations");
        if (!Directory.Exists(migrationsDirectory))
        {
            throw new DirectoryNotFoundException($"Migrations directory not found: {migrationsDirectory}");
        }

        var files = Directory.GetFiles(migrationsDirectory, "*.sql")
            .Select(path => Path.GetFileName(path) ?? string.Empty)
            .Where(static name => MigrationFileName.IsMatch(name))
            .OrderBy(name => name, StringComparer.Ordinal)
            .ToArray();

        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        await connection.ExecuteAsync(
            """
            CREATE TABLE IF NOT EXISTS schema_migrations (
                version TEXT PRIMARY KEY,
                applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
            );
            """);

        var applied = (await connection.QueryAsync<string>("SELECT version FROM schema_migrations"))
            .ToHashSet(StringComparer.Ordinal);

        foreach (var fileName in files)
        {
            if (applied.Contains(fileName))
            {
                continue;
            }

            var path = Path.Combine(migrationsDirectory, fileName);
            var sql = await File.ReadAllTextAsync(path, cancellationToken);

            await using var transaction = await connection.BeginTransactionAsync(cancellationToken);
            await connection.ExecuteAsync(new CommandDefinition(sql, transaction: transaction, cancellationToken: cancellationToken));
            await connection.ExecuteAsync(
                new CommandDefinition(
                    "INSERT INTO schema_migrations (version) VALUES (@version)",
                    new { version = fileName },
                    transaction,
                    cancellationToken: cancellationToken));
            await transaction.CommitAsync(cancellationToken);

            logger.LogInformation("Applied database migration {Migration}", fileName);
        }
    }
}

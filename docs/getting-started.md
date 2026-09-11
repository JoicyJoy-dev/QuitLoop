# Getting started

## 1. Clone and environment

From the repository root:

```bash
cp .env.example .env
```

The `.env` file is for local Docker. It is not used as production secrets storage.

## 2. Run API + PostgreSQL

```bash
docker compose up --build
```

Compose starts Postgres, waits until it accepts connections, then starts the API. The API applies SQL migrations on startup.

Verify:

```bash
curl http://localhost:8080/health
```

A healthy response looks like:

```json
{
  "status": "Healthy",
  "checks": [
    {
      "name": "self",
      "status": "Healthy"
    },
    {
      "name": "postgres",
      "status": "Healthy"
    }
  ]
}
```

OpenAPI document (when `ASPNETCORE_ENVIRONMENT=Development`):

```bash
curl http://localhost:8080/openapi/v1.json
```

## 3. Run the API on the host

Useful for Cursor/`dotnet watch` while Postgres stays in Docker:

```bash
docker compose up postgres
cd apps/api
dotnet watch --project src/QuitLoop.Api
```

Development URLs are in `src/QuitLoop.Api/Properties/launchSettings.json` (`http://localhost:5080`).

`appsettings.Development.json` points at `localhost:5432` with the same credentials as `.env.example`.

## 4. Mobile app

```bash
cd apps/mobile
npm install
npx expo start
```

The app is a shell only. Point it at the API later with `EXPO_PUBLIC_API_URL` (see `apps/mobile/.env.example`).

On a physical device, `localhost` is the phone, not your PC. Use your machine's LAN IP or a tunnel.

## 5. Reset the database

```bash
docker compose down -v
docker compose up --build
```

`-v` deletes the Postgres volume. Migrations then run on an empty database.

## Ports

| Service | Port |
| --- | --- |
| API in Docker | 8080 |
| API on host (`dotnet run`) | 5080 |
| PostgreSQL | 5432 |

## SDK pin

`apps/api/global.json` pins .NET SDK `10.0.400` with `latestFeature` roll-forward. Install any current .NET 10 SDK from https://dotnet.microsoft.com/download/dotnet/10.0.

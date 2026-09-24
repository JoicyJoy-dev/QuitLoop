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

Compose starts Postgres (Docker network only) and the API. The API applies SQL migrations on startup.

To use `dotnet watch` against Docker Postgres, also publish 5432 on loopback:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up postgres
```

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
docker compose -f docker-compose.yml -f docker-compose.local.yml up postgres
cd apps/api
dotnet watch --project src/QuitLoop.Api
```

Development URLs are in `src/QuitLoop.Api/Properties/launchSettings.json` (`http://localhost:5080`).

`appsettings.Development.json` points at `localhost:5432` with the same credentials as `.env.example`.

## 4. Website

```bash
cd apps/web
npm install
npm run dev
```

Open http://localhost:3000.

## 5. Mobile app

```bash
cd apps/mobile
npm install
npx expo start
```

The app defaults to the hosted API at https://api.quitloop.org. Override with `EXPO_PUBLIC_API_URL` (see `apps/mobile/.env.example`) to use a local API.

On a physical device, `localhost` is the phone, not your PC. Use your machine's LAN IP or a tunnel.

## 6. Reset the database

```bash
docker compose down -v
docker compose up --build
```

`-v` deletes the Postgres volume. Migrations then run on an empty database.

## Production (EC2)

Postgres is not published on the host (avoids clashing with another Postgres). Nginx should proxy [https://api.quitloop.org](https://api.quitloop.org) to `http://127.0.0.1:8080`.

```bash
cp .env.example .env
# set POSTGRES_PASSWORD (no $ characters) and ASPNETCORE_ENVIRONMENT=Production
chmod 600 .env
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
curl http://127.0.0.1:8080/health
```

## Ports

| Service | Port |
| --- | --- |
| API in Docker | 8080 (prod: `127.0.0.1:8080`) |
| API on host (`dotnet run`) | 5080 |
| PostgreSQL | Docker network only (optional local: `127.0.0.1:5432`) |

## SDK pin

`apps/api/global.json` pins .NET SDK `10.0.400` with `latestFeature` roll-forward. Install any current .NET 10 SDK from https://dotnet.microsoft.com/download/dotnet/10.0.

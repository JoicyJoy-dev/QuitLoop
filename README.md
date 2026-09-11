# QuitLoop

QuitLoop is a behavioural-change platform that helps adults reduce or quit vaping. The first market is the United Kingdom; the architecture is built for additional countries, currencies, languages, time zones, units and regional configuration without restructuring the core application.

This repository is a **runnable foundation**, not the full product. It establishes the monorepo, modular API, PostgreSQL database, Docker environment and mobile app shell.

## Repository layout

| Path | Purpose |
| --- | --- |
| `apps/api` | .NET 10 modular monolith (Minimal APIs, Dapper, Npgsql, PostgreSQL) |
| `apps/mobile` | React Native + TypeScript client (Expo) |
| `infrastructure` | Docker Compose and container configuration |
| `docs` | Architecture and getting-started documentation |

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose)
- Node.js 22.13+ (mobile app only)

Visual Studio is not required. The API is developed with Cursor/VS Code and the `dotnet` CLI, and it runs on Linux in containers.

## Quick start (API + PostgreSQL)

```bash
cp .env.example .env
docker compose up --build
```

Then open:

- API: http://localhost:8080
- Health: http://localhost:8080/health
- OpenAPI (Development): http://localhost:8080/openapi/v1.json

Stop with `Ctrl+C`, or `docker compose down`. Add `-v` to `down` only if you want to delete the Postgres volume.

## Local API (without the API container)

Start Postgres only:

```bash
docker compose up postgres
```

From `apps/api`:

```bash
dotnet run --project src/QuitLoop.Api
```

The Development profile listens on http://localhost:5080.

## Mobile

```bash
cd apps/mobile
npm install
npx expo start
```

See [docs/getting-started.md](docs/getting-started.md) for details and [docs/architecture.md](docs/architecture.md) for how the modular monolith is structured.

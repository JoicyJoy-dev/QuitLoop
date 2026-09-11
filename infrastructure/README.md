# Infrastructure

Docker Compose runs the local (and first-deploy) stack: PostgreSQL and the QuitLoop API.

Kubernetes is intentionally not used.

## Files

| File | Role |
| --- | --- |
| `docker-compose.yml` | Postgres + API services |
| `../apps/api/Dockerfile` | Linux multi-stage build for the API |
| `../.env.example` | Local variable template |

A root `docker-compose.yml` includes this file so `docker compose up` works from the repository root.

## Commands

From the repository root:

```bash
cp .env.example .env
docker compose up --build
```

Equivalent, from this folder:

```bash
docker compose --env-file ../.env up --build
```

## Services

**postgres** — official `postgres:18` image. Data is stored in the `quitloop_postgres` volume. Schema is **not** created by `docker-entrypoint-initdb.d`; the API migrator owns schema so it stays versioned with the code.

**api** — starts after Postgres is healthy, applies migrations, listens on `8080`.

## Health

- Postgres: `pg_isready`
- API: `GET /health` (process + `SELECT 1` against Postgres)

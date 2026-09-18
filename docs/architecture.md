# Architecture

QuitLoop is a **modular monolith**: one deployable API, one PostgreSQL database, modules separated by domain. The first launch market is the UK; the domain is designed so additional countries can be added as configuration and data, not as a rewrite.

## System shape

```
┌─────────────────┐       ┌──────────────────────────────────┐
│  apps/mobile    │       │  apps/api  (.NET 10 Minimal API) │
│  React Native   │──────▶│  Auth Users UsageTracking        │
│  TypeScript     │       │  QuitPlans Cravings Spending     │
└─────────────────┘       │  Progress Health Rewards         │
┌─────────────────┐       │              │                   │
│  apps/web       │──────▶│              │                   │
│  Next.js        │       └──────────────┼───────────────────┘
└─────────────────┘                      │ Dapper + Npgsql
                                         ▼
                                  PostgreSQL
```

There is a single process and a single database. Modules are folders with their own endpoints and (later) their own SQL and types. They share a small kernel for regional values, money, and database access.

## What this foundation includes

- Solution and project structure for .NET 10
- PostgreSQL connection via `NpgsqlDataSource`
- SQL file migrations run at startup
- `/health` (API process + PostgreSQL)
- Module registration for every core domain
- Regional configuration stored as data (`regional_configurations`) and as deploy-time options
- Docker Compose for API + Postgres on Linux containers

Product features (onboarding, tracking, plans, cravings, and so on) are **not** implemented yet.

## Core modules

| Module | Responsibility (when implemented) |
| --- | --- |
| Auth | Sign-up, sign-in, session/token lifecycle |
| Users | Profile, preferences, locale and regional settings |
| UsageTracking | Vaping usage events and daily totals |
| QuitPlans | Reduction/quit plans and daily goals |
| Cravings | Craving logs and emergency support |
| Spending | Spend, savings, money in minor units + currency |
| Progress | Streaks, adherence, basic analytics |
| Health | Health-related insights from reduced usage |
| Rewards | Milestones and non-monetary rewards |

HTTP `/health` is the **infrastructure** probe. The Health **product** module will use a different route prefix (`/health-insights`) so the two never collide.

## Regional and locale design

Do **not** hard-code UK values in business rules. Persist and pass:

| Concern | Representation |
| --- | --- |
| Country | ISO 3166-1 alpha-2 (`GB`, `US`, `IN`, …) |
| Currency | ISO 4217 (`GBP`, `USD`, `EUR`, …) |
| Language | BCP 47 (`en-GB`, `en-US`, `hi-IN`, …) |
| Time zone | IANA (`Europe/London`, `America/New_York`, …) |
| Units | `metric` or `imperial` |
| Money | Integer **minor units** + currency code (never `float`) |

The UK MVP supplies **defaults** through configuration and a seeded `regional_configurations` row for `GB`. Another market is a new row plus configuration, not a new service.

Timestamps are stored as `TIMESTAMPTZ` (UTC). Display conversion uses the user's IANA time zone.

## Data access

- PostgreSQL is the system of record
- Dapper maps SQL to objects
- `NpgsqlDataSource` is the connection pool
- Schema changes are ordered `.sql` files in `apps/api/src/QuitLoop.Api/Migrations`

There is no repository layer, no ORM, and no unit-of-work wrapper. Handlers will open a connection from `NpgsqlDataSource` and run SQL.

## Explicitly out of scope

Do not introduce these unless there is a proven, documented need:

- Microservices
- CQRS / MediatR
- Event sourcing
- Redis
- Message queues
- Kubernetes
- Extra repository or service abstractions
- IIS / Windows Server / .NET Framework

## Hosting model

The API is a Linux container (`mcr.microsoft.com/dotnet/aspnet:10.0`) listening on port 8080. Docker Compose is the local and first-deploy orchestrator. Kubernetes is not part of this foundation.

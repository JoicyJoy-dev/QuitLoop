# Modules

Each module is a folder under `apps/api/src/QuitLoop.Api/Modules`. A module registers services and maps its HTTP group. Feature code is added inside the module that owns the behaviour; shared regional and money types live in `Shared`.

This foundation only wires the modules. Endpoints and tables for each product flow come later.

## Auth

Sign-up, sign-in, credential storage, and session/token lifecycle. Ownership of identity records. Does not own profile locale fields (those sit on Users).

## Users

The person using QuitLoop: profile, notification preferences, and **regional settings** (country, currency, language, time zone, unit system). Onboarding will write these fields; they must remain per-user so a later market is not a special case.

## UsageTracking

Vaping usage events (when, how much, product context). Source of daily totals used by plans, spending, progress and health insights. Persist in UTC; interpret “day” in the user's time zone.

## QuitPlans

Reduction or quit plans and daily goals. Goals are relative to the user's tracked usage, not a hard-coded national average. Plan templates may later vary by country via regional configuration, not via forked logic.

## Cravings

Craving events and in-the-moment (emergency) support content. Support content may become locale- and country-specific; the module should key content by language and country rather than embedding UK copy in code.

## Spending

Money in and money saved. Store amounts as integer minor units plus an ISO 4217 currency code. Never assume pence, pounds, or a single currency in calculations.

## Progress

Streaks, goal adherence, and basic analytics derived from usage, plans and cravings. Aggregations must use the user's time zone for calendar days.

## Health

Product insights about health effects of reduced or stopped use. **Not** the HTTP `/health` probe. Planned route prefix: `/health-insights`. Clinical integrations (later, per country) belong behind this module's boundary.

## Rewards

Milestones and recognition. Keep rewards data-driven so regional programmes can differ without splitting the module.

## Adding a feature

1. Put types, SQL and endpoints in the owning module.
2. Cross-module reads are allowed (this is a monolith). Do not create a network boundary.
3. If two modules need the same write, pick one owner and call it directly.
4. New countries are rows in `regional_configurations` plus content/config, not new modules.

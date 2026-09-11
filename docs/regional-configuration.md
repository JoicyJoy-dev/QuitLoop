# Regional configuration

QuitLoop must work in one country first and many countries later. The rule is: **region is data and configuration, not control flow in the core domain**.

## What varies by region

| Setting | Standard | Example (UK MVP) |
| --- | --- | --- |
| Country | ISO 3166-1 alpha-2 | `GB` |
| Currency | ISO 4217 | `GBP` |
| Language | BCP 47 | `en-GB` |
| Time zone | IANA | `Europe/London` |
| Unit system | `metric` \| `imperial` | `metric` |

`GB` is the ISO code for the United Kingdom. Do not use `UK` as a country code.

## Where defaults live

1. **Deploy-time options** (`Regional` in `appsettings.json`, overridden by environment variables). These are the defaults for *this deployment* (UK MVP today, another market tomorrow).
2. **`regional_configurations` table**. One row per supported country. Seeded with `GB` for the MVP.
3. **`users` table**. Each user stores their own country, currency, language, time zone and unit system. Product behaviour should read the user (or an explicit request context), not the deployment default, once a user exists.

Onboarding may copy deployment/table defaults onto a new user. After that, the user row is authoritative.

## Money

- Persist `amount_minor_units` (`bigint`) and `currency_code` (`CHAR(3)`).
- Never persist currency as a decimal `float`.
- Do not name columns `pence` or `pounds`.
- Conversion between currencies is out of scope until a market needs it; until then, a user's currency is the only currency on their spending records.

The `Money` type in `Shared/Money` encodes this pair in the API.

## Time

- Store instants as `TIMESTAMPTZ` (UTC).
- Calendar dates (a “day” of usage, a streak day) are computed in the user's IANA time zone.
- Do not assume `Europe/London` or BST/GMT in code.

## Language and content

User-facing strings from the API should be selected by `language_code` (and later country, if legal copy differs). Hard-coded English in business logic should be treated as a defect once localisation work starts. The foundation does not ship a localisation framework.

## Adding a country

Without changing module boundaries:

1. Insert a `regional_configurations` row.
2. Supply content (craving support, legal copy, health messaging) keyed by country/language.
3. If the new deployment's defaults differ, change environment variables / `appsettings`, not C#.

Health-system integrations, tax, and age gates are additional columns or related tables on regional configuration when they exist — still configuration, still not a new service.

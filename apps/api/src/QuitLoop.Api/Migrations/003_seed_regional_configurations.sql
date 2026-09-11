-- Seed the first supported market. This is data, not a hard-coded business rule.
INSERT INTO regional_configurations (
    country_code,
    currency_code,
    default_language_code,
    default_time_zone,
    default_unit_system
)
VALUES (
    'GB',
    'GBP',
    'en-GB',
    'Europe/London',
    'metric'
);

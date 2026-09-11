CREATE TABLE regional_configurations (
    country_code            CHAR(2)     PRIMARY KEY,
    currency_code           CHAR(3)     NOT NULL,
    default_language_code   TEXT        NOT NULL,
    default_time_zone       TEXT        NOT NULL,
    default_unit_system     TEXT        NOT NULL,
    is_enabled              BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_regional_configurations_country_code
        CHECK (country_code ~ '^[A-Z]{2}$'),
    CONSTRAINT chk_regional_configurations_currency_code
        CHECK (currency_code ~ '^[A-Z]{3}$'),
    CONSTRAINT chk_regional_configurations_unit_system
        CHECK (default_unit_system IN ('metric', 'imperial'))
);

COMMENT ON TABLE regional_configurations IS
    'Supported countries and their default locale settings. Additional markets are new rows, not schema forks.';

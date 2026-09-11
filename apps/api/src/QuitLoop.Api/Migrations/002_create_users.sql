CREATE TABLE users (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    email               TEXT        NOT NULL,
    email_normalized    TEXT        NOT NULL,
    country_code        CHAR(2)     NOT NULL,
    currency_code       CHAR(3)     NOT NULL,
    language_code       TEXT        NOT NULL,
    time_zone           TEXT        NOT NULL,
    unit_system         TEXT        NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_users_email_normalized UNIQUE (email_normalized),
    CONSTRAINT chk_users_country_code
        CHECK (country_code ~ '^[A-Z]{2}$'),
    CONSTRAINT chk_users_currency_code
        CHECK (currency_code ~ '^[A-Z]{3}$'),
    CONSTRAINT chk_users_unit_system
        CHECK (unit_system IN ('metric', 'imperial')),
    CONSTRAINT fk_users_country_code
        FOREIGN KEY (country_code) REFERENCES regional_configurations (country_code)
);

CREATE INDEX ix_users_country_code ON users (country_code);

COMMENT ON TABLE users IS
    'People using QuitLoop. Locale and regional fields are per-user so behaviour is not tied to a single country.';
COMMENT ON COLUMN users.email_normalized IS
    'Lower-cased email used for uniqueness. Auth credentials will be added in a later migration.';

ALTER TABLE users
    ADD COLUMN password_hash TEXT,
    ADD COLUMN display_name TEXT;

UPDATE users SET password_hash = '' WHERE password_hash IS NULL;
ALTER TABLE users ALTER COLUMN password_hash SET NOT NULL;

COMMENT ON COLUMN users.password_hash IS
    'PBKDF2-SHA256 encoded as v1.iterations.salt.hash. Required for email/password accounts.';
COMMENT ON COLUMN users.display_name IS
    'Optional given name shown in the app. Locale and regional fields stay on the user row.';
COMMENT ON COLUMN users.email_normalized IS
    'Lower-cased email used for uniqueness and sign-in.';

CREATE TABLE auth_sessions (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    token_hash      TEXT        NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at      TIMESTAMPTZ NOT NULL,
    revoked_at      TIMESTAMPTZ,
    CONSTRAINT uq_auth_sessions_token_hash UNIQUE (token_hash)
);

CREATE INDEX ix_auth_sessions_user_id ON auth_sessions (user_id);
CREATE INDEX ix_auth_sessions_expires_at ON auth_sessions (expires_at);

COMMENT ON TABLE auth_sessions IS
    'Opaque bearer sessions for mobile and web. Tokens are stored hashed so a database leak is not immediately usable.';

CREATE TABLE password_reset_tokens (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    token_hash      TEXT        NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at      TIMESTAMPTZ NOT NULL,
    used_at         TIMESTAMPTZ,
    CONSTRAINT uq_password_reset_tokens_token_hash UNIQUE (token_hash)
);

CREATE INDEX ix_password_reset_tokens_user_id ON password_reset_tokens (user_id);

COMMENT ON TABLE password_reset_tokens IS
    'Single-use forgot-password tokens. The raw token is emailed or shown in Development; only the hash is stored.';

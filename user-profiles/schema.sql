-- User profiles table
-- Assumes a users table already exists with a primary key `id`

CREATE TABLE IF NOT EXISTS user_profiles (
  id            SERIAL          PRIMARY KEY,
  user_id       INTEGER         NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  display_name  VARCHAR(100)    NOT NULL,
  bio           TEXT,
  avatar_url    VARCHAR(2048),
  website       VARCHAR(2048),
  location      VARCHAR(100),
  birth_date    DATE,
  created_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Keep updated_at current automatically
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- User profiles table
-- Assumes a users table already exists with a primary key `id`

CREATE TABLE IF NOT EXISTS user_profiles (
  user_id       INTEGER         PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  display_name  VARCHAR(100),
  bio           TEXT            CHECK (char_length(bio) <= 300),
  avatar_url    VARCHAR(2048),
  website       VARCHAR(2048),
  location      VARCHAR(100),
  birth_date    DATE            CHECK (birth_date BETWEEN '1900-01-01' AND CURRENT_DATE),
  created_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Namespaced to avoid clashing with trigger functions on other tables
CREATE OR REPLACE FUNCTION user_profiles_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION user_profiles_set_updated_at();

CREATE TABLE demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- client-generated once per form load; same UUID on retries → upsert deduplicates
  request_key uuid NOT NULL UNIQUE,
  name text NOT NULL CHECK (char_length(name) <= 200),
  email text NOT NULL CHECK (char_length(email) <= 200),
  company text CHECK (char_length(company) <= 200),
  message text NOT NULL CHECK (char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX demo_requests_created_at_idx ON demo_requests (created_at DESC);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Must target anon explicitly; {public} (no TO clause) is not honoured by PostgREST
CREATE POLICY "anon can insert demo requests"
  ON demo_requests FOR INSERT TO anon
  WITH CHECK (true);

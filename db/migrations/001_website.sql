CREATE SCHEMA mavi_web;

CREATE TABLE mavi_web.products (
  id text PRIMARY KEY,
  name text NOT NULL
);
INSERT INTO mavi_web.products (id, name) VALUES
  ('pay', 'mavi pay'), ('creators', 'For Creators'), ('card', 'mavi card'),
  ('wallet', 'mavi wallet'), ('banking', 'mavi finans');

CREATE TABLE mavi_web.waitlist_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (email = lower(btrim(email)) AND length(email) BETWEEN 3 AND 254),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE mavi_web.waitlist_interests (
  subscriber_id uuid NOT NULL REFERENCES mavi_web.waitlist_subscribers(id) ON DELETE CASCADE,
  product_id text NOT NULL REFERENCES mavi_web.products(id),
  PRIMARY KEY (subscriber_id, product_id)
);
CREATE INDEX waitlist_interests_product_idx ON mavi_web.waitlist_interests(product_id);

CREATE TABLE mavi_web.contact_submissions (
  id uuid PRIMARY KEY,
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 200),
  email text NOT NULL CHECK (email = lower(btrim(email)) AND length(email) BETWEEN 3 AND 254),
  subject text NOT NULL CHECK (length(subject) BETWEEN 1 AND 300),
  message text NOT NULL CHECK (length(message) BETWEEN 10 AND 10000),
  archive_key text NOT NULL UNIQUE,
  archive_status text NOT NULL DEFAULT 'pending' CHECK (archive_status IN ('pending', 'stored')),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'resolved', 'spam')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX contact_submissions_status_created_idx ON mavi_web.contact_submissions(status, created_at DESC);
CREATE INDEX contact_submissions_email_idx ON mavi_web.contact_submissions(email);

CREATE TABLE mavi_web.submission_quotas (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL,
  count integer NOT NULL CHECK (count > 0)
);

-- No browser-facing database grants; only the protected server backend uses these tables.
REVOKE ALL ON SCHEMA mavi_web FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA mavi_web FROM PUBLIC;

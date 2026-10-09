CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL,
 email text NOT NULL,
 service text NOT NULL,
 message text NOT NULL,
 recipient text NOT NULL DEFAULT 'sonimwangi6@gmail.com'
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.contact_submissions IS 'Private N19 HUB inquiries. No public read or write access; validated server inserts only.';
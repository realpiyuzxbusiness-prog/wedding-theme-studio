-- Supabase Schema for Golden Frames Wedding Studio
-- Table: public.bookings
-- Description: Stores all booking enquiries from Contact form and Booking Modal

-- 1. Create the table (if not exists)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  wedding_date TEXT,
  venue_city TEXT,
  package_name TEXT,
  services JSONB DEFAULT '[]'::jsonb,
  estimated_total INTEGER DEFAULT 0,
  message TEXT
);

-- 2. Enable Row Level Security (CRITICAL for data privacy)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 3. DROP existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.bookings;
DROP POLICY IF EXISTS "Block anonymous reads" ON public.bookings;
DROP POLICY IF EXISTS "Block anonymous updates" ON public.bookings;
DROP POLICY IF EXISTS "Block anonymous deletes" ON public.bookings;

-- 4. CREATE Policies

-- Policy: Allow ANYONE to insert (required for the website forms)
CREATE POLICY "Allow anonymous inserts" ON public.bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: BLOCK anonymous reads (prevents people from stealing customer data)
-- Note: Service role (Admin) can still read all data in the dashboard
CREATE POLICY "Block anonymous reads" ON public.bookings
  FOR SELECT
  TO anon
  USING (false);

-- Policy: BLOCK anonymous updates
CREATE POLICY "Block anonymous updates" ON public.bookings
  FOR UPDATE
  TO anon
  USING (false);

-- Policy: BLOCK anonymous deletes
CREATE POLICY "Block anonymous deletes" ON public.bookings
  FOR DELETE
  TO anon
  USING (false);

-- 5. Grant permissions (standard Supabase setup)
GRANT ALL ON TABLE public.bookings TO postgres;
GRANT ALL ON TABLE public.bookings TO service_role;
GRANT INSERT ON TABLE public.bookings TO anon;
GRANT SELECT ON TABLE public.bookings TO anon; -- Required for the INSERT policy to check existing rows if needed, but the SELECT policy above will still block reading.


-- ================================================================
-- SUPABASE EDGE FUNCTION & WEBHOOK SETUP
-- ================================================================

/*
  1. DEPLOY THE EDGE FUNCTION:
     Run this in your terminal:
     supabase functions deploy send-booking-email --project-ref fjaocwsmnsycuihkryhs

  2. SET ENVIRONMENT VARIABLES:
     Run this in your terminal:
     supabase secrets set RESEND_API_KEY=re_j71Z5LS9_L3P9xpEQvXCnLFwZV8WKaggx --project-ref fjaocwsmnsycuihkryhs

  3. ENABLE WEBHOOKS:
     Go to: Database -> Webhooks -> Enable Webhooks

  4. CREATE THE TRIGGER WEBHOOK:
     Name: send_booking_email_on_insert
     Table: bookings
     Events: INSERT
     Type: Edge Function
     Edge Function: send-booking-email
     Method: POST
     Timeout: 1000ms
*/

-- Run this SQL in your Supabase SQL Editor to create all required tables

-- 1. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Careers table
CREATE TABLE IF NOT EXISTS careers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  university TEXT,
  college TEXT,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Visitors table (for analytics)
CREATE TABLE IF NOT EXISTS visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visited_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security Policies
-- Allow anyone to INSERT (public forms)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts on bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts on contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts on careers" ON careers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts on visitors" ON visitors FOR INSERT WITH CHECK (true);

-- Allow anyone to SELECT (admin reads via anon key — restrict further in production)
CREATE POLICY "Allow public reads on bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Allow public reads on contacts" ON contacts FOR SELECT USING (true);
CREATE POLICY "Allow public reads on careers" ON careers FOR SELECT USING (true);
CREATE POLICY "Allow public reads on visitors" ON visitors FOR SELECT USING (true);

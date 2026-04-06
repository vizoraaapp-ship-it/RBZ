import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Type definitions for each table ---
export interface Booking {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  message?: string;
  created_at?: string;
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
  created_at?: string;
}

export interface Career {
  id?: string;
  full_name: string;
  age: number;
  phone: string;
  email: string;
  university?: string;
  college?: string;
  role: string;
  created_at?: string;
}

export interface Visitor {
  id?: string;
  visited_at?: string;
}

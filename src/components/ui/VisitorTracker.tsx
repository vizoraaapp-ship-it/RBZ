'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function VisitorTracker() {
  useEffect(() => {
    supabase.from('visitors').insert({}).then(() => {});
  }, []);
  return null;
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eljxmgouwyixrajllhef.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsanhtZ291d3lpeHJhamxsaGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0ODI1MTcsImV4cCI6MjA5MTA1ODUxN30.ILhJgsMBqb8oG8az09TKeuzNOHejAlLqlK3FjP2HKx4'
const supabase = createClient(supabaseUrl, supabaseKey)

async function reorderBanners() {
  await supabase.from('banners').update({ display_order: 0 }).eq('id', 'c6ed6376-ec84-4ab7-be53-d3f697ce61c0')
  await supabase.from('banners').update({ display_order: 1 }).eq('id', 'af52fc41-5521-4f0e-a65c-e38db33a7db6')
  await supabase.from('banners').update({ display_order: 2 }).eq('id', 'e5d2d955-1625-46d0-ad19-e46d6f2ed97a')
  await supabase.from('banners').update({ display_order: 3 }).eq('id', 'fea89287-bb87-4c9a-9855-ac0989bda218')

  console.log('Successfully reordered banners.')
}

reorderBanners()

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eljxmgouwyixrajllhef.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsanhtZ291d3lpeHJhamxsaGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0ODI1MTcsImV4cCI6MjA5MTA1ODUxN30.ILhJgsMBqb8oG8az09TKeuzNOHejAlLqlK3FjP2HKx4'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkBanners() {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
  
  if (error) {
    console.error('Error:', error)
    return
  }
  
  console.log('Banners in DB:', JSON.stringify(data, null, 2))
}

checkBanners()

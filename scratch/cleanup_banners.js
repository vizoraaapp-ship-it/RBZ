import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eljxmgouwyixrajllhef.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsanhtZ291d3lpeHJhamxsaGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0ODI1MTcsImV4cCI6MjA5MTA1ODUxN30.ILhJgsMBqb8oG8az09TKeuzNOHejAlLqlK3FjP2HKx4'
const supabase = createClient(supabaseUrl, supabaseKey)

async function cleanUpBanners() {
  // 1. Rename other "Welcome" banners to avoid conflict with the new first one
  const { data, error } = await supabase
    .from('banners')
    .select('id, title, image_url')
  
  if (error) return console.error(error)

  for (const banner of data) {
    if (banner.title && banner.image_url !== '/service-hero.png' && banner.title.toLowerCase().includes('welcome')) {
      console.log('Renaming conflicting welcome banner:', banner.id)
      await supabase
        .from('banners')
        .update({ title: 'Precision Climate Care', badge: 'Expert HVAC Services' })
        .eq('id', banner.id)
    }
  }
}

cleanUpBanners()

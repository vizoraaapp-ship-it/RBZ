import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eljxmgouwyixrajllhef.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsanhtZ291d3lpeHJhamxsaGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0ODI1MTcsImV4cCI6MjA5MTA1ODUxN30.ILhJgsMBqb8oG8az09TKeuzNOHejAlLqlK3FjP2HKx4'
const supabase = createClient(supabaseUrl, supabaseKey)

async function updateBanners() {
  // 1. Find the banner with /service-hero.png (Kitchen)
  const { data: kitchenBanner, error: fetchError } = await supabase
    .from('banners')
    .select('id')
    .eq('image_url', '/service-hero.png')
    .single()

  if (fetchError) {
    console.error('Fetch Error:', fetchError)
    // Maybe try to update all banners if we can't find specific one
  } else if (kitchenBanner) {
    console.log('Found Kitchen Banner ID:', kitchenBanner.id)
    
    // Update it to be the first one with new content
    const { error: updateError } = await supabase
      .from('banners')
      .update({
        title: 'Welcome to RBZ',
        description: 'Rbz Climate Solutions\nHeating and Cooling\nKeeping you cool in summer and warm in winter',
        badge: 'Precision HVAC Services',
        banner_type: 'with_text',
        display_order: 0 // Make it first
      })
      .eq('id', kitchenBanner.id)

    if (updateError) {
      console.error('Update Error:', updateError)
    } else {
      console.log('Successfully updated Kitchen banner to first position with new content.')
    }
  }

  // 2. Set others to higher display order
  await supabase
    .from('banners')
    .update({ display_order: 1 })
    .neq('image_url', '/service-hero.png')
}

updateBanners()

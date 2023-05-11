import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@1.34.0'

export const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
)

serve(async (req) => {
  const { data, error } = await supabaseClient.from('Users').select()

  return new Response(
    JSON.stringify({items: data}),
    { headers: { "Content-Type": "application/json" } },
  )
})

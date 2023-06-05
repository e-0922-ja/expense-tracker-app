import { createClient } from '@supabase/supabase-js';

if (
  !process.env.REACT_APP_SUPABASE_URL ||
  !process.env.REACT_APP_SUPABASE_ANON_KEY
) {
  throw new Error('Missing Supabase env variables');
}

export const client = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

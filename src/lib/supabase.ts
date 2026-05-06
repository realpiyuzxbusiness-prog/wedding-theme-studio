import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials missing — booking form will log to console only.');
  // Create a mock client that won't crash the app
  supabase = {
    from: () => ({
      insert: async (data: unknown) => {
        console.log('Mock Supabase insert:', data);
        return { error: null };
      },
      select: async () => ({ data: [], error: null }),
    }),
  } as unknown as SupabaseClient;
}

export { supabase };

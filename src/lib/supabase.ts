import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Client-side Supabase client (use in 'use client' components)
export const createBrowserClient = () =>
  createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  })

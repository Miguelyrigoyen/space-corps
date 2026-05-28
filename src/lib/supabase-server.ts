import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Server-side Supabase client — only import this in Server Components
export const createServerClient = () =>
  createServerComponentClient({ cookies })

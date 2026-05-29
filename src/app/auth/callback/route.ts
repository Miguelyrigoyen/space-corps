import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code       = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type       = searchParams.get('type')

  const supabase = createRouteHandlerClient({ cookies })

  if (token_hash && type) {
    // Magic link flow
    await supabase.auth.verifyOtp({ token_hash, type: type as 'email' | 'recovery' | 'invite' | 'email_change' })
  } else if (code) {
    // OAuth / PKCE flow
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/dashboard', req.url))
}

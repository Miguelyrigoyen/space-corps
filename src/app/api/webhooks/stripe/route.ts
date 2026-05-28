import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    return NextResponse.json(
      { error: `Webhook error: ${err instanceof Error ? err.message : 'Unknown'}` },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata ?? {}

    const { error } = await supabaseAdmin.from('reservations').insert({
      tier_id: meta.tierId || null,
      destination: meta.destination || null,
      preservation_type: meta.preservationType || null,
      full_name: `${meta.firstName} ${meta.lastName}`.trim(),
      email: session.customer_email,
      phone: meta.phone || null,
      memorial_name: meta.memorialName || null,
      stripe_session_id: session.id,
      deposit_paid: true,
      status: 'deposit_paid',
    })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

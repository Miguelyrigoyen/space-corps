import { NextRequest, NextResponse } from 'next/server'
import { stripe, DEPOSIT_AMOUNT } from '@/lib/stripe'
import { TIERS } from '@/lib/tiers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      tierId,
      destination,
      preservationType,
      firstName,
      lastName,
      email,
      phone,
      memorialName,
    } = body

    const tier = TIERS.find(t => t.id === tierId)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: DEPOSIT_AMOUNT,
            product_data: {
              name: `Space Corps — Waitlist Deposit${tier ? `: ${tier.name}` : ''}`,
              description:
                `Fully refundable deposit to secure your place on the Space Corps waitlist. ` +
                `Destination: ${destination ?? 'TBD'} · Preservation: ${preservationType ?? 'TBD'}`,
              images: [],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        tierId: tierId ?? '',
        destination: destination ?? '',
        preservationType: preservationType ?? '',
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        phone: phone ?? '',
        memorialName: memorialName ?? '',
      },
      success_url: `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${appUrl}/configure`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err: unknown) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PRICE_IDS, stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const price = plan === 'creator' ? PRICE_IDS.creator : PRICE_IDS.pro;
    if (!price) return NextResponse.json({ error: 'Missing Stripe price IDs.' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?status=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?status=cancelled`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

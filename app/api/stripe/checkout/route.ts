import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { PRICES } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const { plan, userId } = await request.json();
    const priceId = PRICES[plan as keyof typeof PRICES]?.stripePriceId;
    if (!priceId || !userId) throw new Error('Missing plan/price/user');

    const { data: user } = await supabaseAdmin.from('users').select('id').eq('id', userId).single();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?canceled=1`,
      metadata: { userId, plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

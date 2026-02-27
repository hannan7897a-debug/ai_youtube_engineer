import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { openai } from '@/lib/openai';
import { assertUsageAllowed } from '@/lib/usage';

export async function POST(request: Request) {
  try {
    const { userId, businessInfo } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    await assertUsageAllowed(userId, 'chatbot_builder');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Create a chatbot system prompt for this business: ${businessInfo}` }],
    });
    const prompt = completion.choices[0]?.message?.content ?? '';
    await supabaseAdmin.from('chatbot_configs').insert({ user_id: userId, business_info: businessInfo, prompt_template: prompt });
    return NextResponse.json({ prompt });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

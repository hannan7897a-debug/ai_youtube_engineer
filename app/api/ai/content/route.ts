import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { openai } from '@/lib/openai';
import { assertUsageAllowed } from '@/lib/usage';

export async function POST(request: Request) {
  try {
    const { userId, topic, tone, wordCount } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    await assertUsageAllowed(userId, 'content_writer');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Write a ${tone} article about ${topic} in about ${wordCount} words.` }],
    });
    const content = completion.choices[0]?.message?.content ?? '';
    await supabaseAdmin.from('generated_content').insert({ user_id: userId, type: 'article', prompt: topic, output: content });
    return NextResponse.json({ content });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

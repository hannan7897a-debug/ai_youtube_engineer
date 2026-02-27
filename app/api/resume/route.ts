import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { openai } from '@/lib/openai';
import { assertUsageAllowed } from '@/lib/usage';

export async function POST(request: Request) {
  try {
    const { userId, name, experience, skills } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    await assertUsageAllowed(userId, 'resume_builder');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Create a professional resume for ${name}. Experience: ${experience}. Skills: ${skills}.` }],
    });
    const resume = completion.choices[0]?.message?.content ?? '';
    await supabaseAdmin.from('resumes').insert({ user_id: userId, raw_data: { name, experience, skills }, generated_text: resume });
    return NextResponse.json({ resume });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

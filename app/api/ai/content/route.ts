import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { topic, tone, words, type } = await req.json();
    const completion = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: `Write a ${type} about ${topic} in a ${tone} tone around ${words} words.`
    });
    return NextResponse.json({ content: completion.output_text });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

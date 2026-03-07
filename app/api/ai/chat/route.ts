import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { instructions } = await req.json();
    const completion = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: `Create a concise high-quality chatbot system prompt using: ${instructions}`
    });
    return NextResponse.json({ prompt: completion.output_text });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

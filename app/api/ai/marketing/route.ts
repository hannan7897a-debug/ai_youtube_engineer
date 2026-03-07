import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { goal } = await req.json();
    const completion = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: `For this business goal: ${goal}\nGenerate:\n1) 3 ad variants\n2) 2 email campaign drafts\n3) 3 product description options`
    });
    return NextResponse.json({ content: completion.output_text });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

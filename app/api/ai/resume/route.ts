import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const completion = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: `Create an ATS-friendly resume in markdown from this data: ${JSON.stringify(data)}`
    });

    return NextResponse.json({ resume: completion.output_text });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

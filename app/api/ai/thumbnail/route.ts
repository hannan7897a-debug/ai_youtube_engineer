import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    const idea = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: `Generate 5 high-CTR YouTube thumbnail concepts for: ${topic}`
    });
    const image = await openai.images.generate({
      model: 'gpt-image-1',
      prompt: `YouTube thumbnail concept for: ${topic}, bold text, vivid colors`,
      size: '1024x1024'
    });
    const b64 = image.data?.[0]?.b64_json;
    if (!b64) throw new Error('No thumbnail image returned');
    const upload = await cloudinary.uploader.upload(`data:image/png;base64,${b64}`, { folder: 'creatorai-thumbnails' });

    return NextResponse.json({ ideas: idea.output_text, imageUrl: upload.secure_url });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

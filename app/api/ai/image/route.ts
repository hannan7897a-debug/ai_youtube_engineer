import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      size: '1024x1024'
    });
    const b64 = result.data?.[0]?.b64_json;
    if (!b64) throw new Error('No image returned');

    const upload = await cloudinary.uploader.upload(`data:image/png;base64,${b64}`, { folder: 'creatorai' });
    return NextResponse.json({ imageUrl: upload.secure_url });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

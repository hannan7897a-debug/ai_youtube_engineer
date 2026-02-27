import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { openai } from '@/lib/openai';
import cloudinary from '@/lib/cloudinary';
import { assertUsageAllowed } from '@/lib/usage';

export async function POST(request: Request) {
  try {
    const { userId, prompt, size } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    await assertUsageAllowed(userId, 'image_generator');
    const image = await openai.images.generate({ model: 'gpt-image-1', prompt, size });
    const b64 = image.data?.[0]?.b64_json;
    if (!b64) throw new Error('No image returned');
    const upload = await cloudinary.uploader.upload(`data:image/png;base64,${b64}`, { folder: 'ai-toolkit-pro' });
    await supabaseAdmin.from('generated_images').insert({ user_id: userId, prompt, image_url: upload.secure_url });
    return NextResponse.json({ url: upload.secure_url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

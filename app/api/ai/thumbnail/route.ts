import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { openai } from '@/lib/openai';
import cloudinary from '@/lib/cloudinary';
import { assertUsageAllowed } from '@/lib/usage';

export async function POST(request: Request) {
  try {
    const { userId, title, style } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    await assertUsageAllowed(userId, 'thumbnail_generator');

    const conceptComp = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Create a YouTube thumbnail concept for title '${title}' in style '${style}'` }],
    });
    const concept = conceptComp.choices[0]?.message?.content ?? '';
    const image = await openai.images.generate({ model: 'gpt-image-1', prompt: `${title} thumbnail, ${style}` });
    const b64 = image.data?.[0]?.b64_json;
    let url = '';
    if (b64) {
      const upload = await cloudinary.uploader.upload(`data:image/png;base64,${b64}`, { folder: 'ai-toolkit-pro/thumbnails' });
      url = upload.secure_url;
      await supabaseAdmin.from('generated_images').insert({ user_id: userId, prompt: `${title} | ${style}`, image_url: url });
    }
    return NextResponse.json({ concept, url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

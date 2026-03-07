import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get('url');
  if (!imageUrl) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  return new NextResponse(arrayBuffer, {
    headers: {
      'content-type': response.headers.get('content-type') || 'image/png',
      'content-disposition': 'attachment; filename="creatorai-image.png"'
    }
  });
}

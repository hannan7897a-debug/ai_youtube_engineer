import { NextResponse } from 'next/server';

export async function GET() {
  const script = `
  (() => {
    const current = document.currentScript;
    const prompt = current?.getAttribute('data-prompt') || 'Hello!';
    const box = document.createElement('div');
    box.innerHTML = '<div style="position:fixed;bottom:20px;right:20px;width:320px;background:#0f172a;color:white;padding:16px;border-radius:12px;z-index:9999">CreatorAI Bot<div style="font-size:12px;opacity:.8;margin-top:8px">'+prompt+'</div></div>';
    document.body.appendChild(box);
  })();`;

  return new NextResponse(script, { headers: { 'content-type': 'application/javascript' } });
}

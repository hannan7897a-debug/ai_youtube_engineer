'use client';
import Image from 'next/image';
import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [url, setUrl] = useState('');

  const generate = async () => {
    const res = await fetch('/api/ai/image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: (await supabaseClient.auth.getUser()).data.user?.id, prompt, size }) });
    const data = await res.json();
    setUrl(data.url || '');
  };

  return <main className="glass rounded-2xl p-6"><h1 className="text-xl font-semibold">AI Image Generator</h1><input className="mt-4 w-full rounded-lg bg-slate-800 p-3" placeholder="Prompt" value={prompt} onChange={(e)=>setPrompt(e.target.value)} /><select className="mt-3 rounded-lg bg-slate-800 p-3" value={size} onChange={(e)=>setSize(e.target.value)}><option>1024x1024</option><option>1792x1024</option><option>1024x1792</option></select><button onClick={generate} className="ml-3 rounded-lg bg-violet-600 px-4 py-2">Generate</button>{url && <div className="mt-4"><Image src={url} alt="AI generated" width={400} height={400} className="rounded-lg" /><a className="mt-2 inline-block text-violet-300" href={url} download>Download image</a></div>}</main>;
}

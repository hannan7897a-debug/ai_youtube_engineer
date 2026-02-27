'use client';
import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function ThumbnailGeneratorPage() {
  const [title, setTitle] = useState('');
  const [style, setStyle] = useState('Bold');
  const [result, setResult] = useState('');
  const [url, setUrl] = useState('');

  const generate = async () => {
    const res = await fetch('/api/ai/thumbnail', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: (await supabaseClient.auth.getUser()).data.user?.id, title, style }) });
    const data = await res.json();
    setResult(data.concept || data.error);
    setUrl(data.url || '');
  };

  return <main className="glass rounded-2xl p-6"><h1 className="text-xl font-semibold">AI Thumbnail Generator</h1><input className="mt-3 w-full rounded-lg bg-slate-800 p-3" placeholder="YouTube Title" value={title} onChange={(e)=>setTitle(e.target.value)} /><select className="mt-3 rounded-lg bg-slate-800 p-3" value={style} onChange={(e)=>setStyle(e.target.value)}><option>Bold</option><option>Minimal</option><option>High Contrast</option></select><button onClick={generate} className="ml-3 rounded-lg bg-violet-600 px-4 py-2">Generate</button><textarea className="mt-4 h-44 w-full rounded-lg bg-slate-900 p-3" value={result} readOnly />{url && <a className="mt-2 inline-block text-violet-300" href={url} target="_blank">Open thumbnail image</a>}</main>;
}

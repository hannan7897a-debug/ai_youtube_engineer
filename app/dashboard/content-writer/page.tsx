'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function ContentWriterPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [wordCount, setWordCount] = useState(500);
  const [result, setResult] = useState('');

  const generate = async () => {
    const res = await fetch('/api/ai/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: (await supabaseClient.auth.getUser()).data.user?.id, topic, tone, wordCount }),
    });
    const data = await res.json();
    setResult(data.content || data.error);
  };

  return <main className="glass rounded-2xl p-6"><h1 className="text-xl font-semibold">AI Content Writer</h1><input className="mt-4 w-full rounded-lg bg-slate-800 p-3" placeholder="Topic" value={topic} onChange={(e)=>setTopic(e.target.value)} /><div className="mt-3 grid gap-3 md:grid-cols-2"><select className="rounded-lg bg-slate-800 p-3" value={tone} onChange={(e)=>setTone(e.target.value)}><option>Professional</option><option>Friendly</option><option>Casual</option></select><input className="rounded-lg bg-slate-800 p-3" type="number" value={wordCount} onChange={(e)=>setWordCount(Number(e.target.value))} /></div><button onClick={generate} className="mt-4 rounded-lg bg-violet-600 px-4 py-2">Generate</button><textarea className="mt-4 h-72 w-full rounded-lg bg-slate-900 p-3" value={result} readOnly /></main>;
}

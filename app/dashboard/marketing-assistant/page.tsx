'use client';
import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function MarketingAssistantPage() {
  const [input, setInput] = useState('');
  const [type, setType] = useState('ad copy');
  const [output, setOutput] = useState('');

  const generate = async () => {
    const res = await fetch('/api/ai/marketing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: (await supabaseClient.auth.getUser()).data.user?.id, input, type }) });
    const data = await res.json();
    setOutput(data.output || data.error);
  };

  return <main className="glass rounded-2xl p-6"><h1 className="text-xl font-semibold">AI Marketing Assistant</h1><input className="mt-3 w-full rounded-lg bg-slate-800 p-3" placeholder="Product / audience details" value={input} onChange={(e)=>setInput(e.target.value)} /><select className="mt-3 rounded-lg bg-slate-800 p-3" value={type} onChange={(e)=>setType(e.target.value)}><option>ad copy</option><option>email campaign</option><option>product description</option></select><button onClick={generate} className="ml-3 rounded-lg bg-violet-600 px-4 py-2">Generate</button><textarea className="mt-4 h-72 w-full rounded-lg bg-slate-900 p-3" value={output} readOnly /></main>;
}

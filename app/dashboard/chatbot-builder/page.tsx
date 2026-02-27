'use client';
import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function ChatbotBuilderPage() {
  const [businessInfo, setBusinessInfo] = useState('');
  const [prompt, setPrompt] = useState('');

  const generate = async () => {
    const res = await fetch('/api/ai/chatbot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: (await supabaseClient.auth.getUser()).data.user?.id, businessInfo }) });
    const data = await res.json();
    setPrompt(data.prompt || data.error);
  };

  return <main className="glass rounded-2xl p-6"><h1 className="text-xl font-semibold">AI Chatbot Builder</h1><textarea className="mt-3 h-32 w-full rounded-lg bg-slate-800 p-3" placeholder="Business info, services, FAQs..." value={businessInfo} onChange={(e)=>setBusinessInfo(e.target.value)} /><button onClick={generate} className="mt-3 rounded-lg bg-violet-600 px-4 py-2">Generate Prompt</button><textarea className="mt-4 h-72 w-full rounded-lg bg-slate-900 p-3" value={prompt} readOnly /><button onClick={()=>navigator.clipboard.writeText(`<script>window.chatbotPrompt=${JSON.stringify(prompt)}</script>`)} className="mt-3 rounded-lg border border-slate-700 px-4 py-2">Copy Embed Code</button></main>;
}

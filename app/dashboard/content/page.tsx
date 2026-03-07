'use client';

import { useState } from 'react';

export default function ContentPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [words, setWords] = useState(600);
  const [type, setType] = useState('Blog post');
  const [result, setResult] = useState('');

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">AI Content Writer</h1>
      <input className="input" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      <div className="grid gap-3 sm:grid-cols-3">
        <select className="input" value={tone} onChange={(e) => setTone(e.target.value)}>
          <option>Professional</option><option>Casual</option><option>Persuasive</option><option>Storytelling</option>
        </select>
        <input className="input" type="number" min={100} value={words} onChange={(e) => setWords(Number(e.target.value))} />
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option>Blog post</option><option>Article</option><option>Video script</option>
        </select>
      </div>
      <button
        className="btn-primary"
        onClick={async () => {
          const res = await fetch('/api/ai/content', { method: 'POST', body: JSON.stringify({ topic, tone, words, type }) });
          const data = await res.json();
          setResult(data.content || data.error || 'No response');
        }}
      >
        Generate
      </button>
      <textarea className="input min-h-72" value={result} onChange={(e) => setResult(e.target.value)} />
    </div>
  );
}

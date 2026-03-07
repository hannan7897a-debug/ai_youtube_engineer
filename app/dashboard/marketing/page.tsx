'use client';

import { useState } from 'react';

export default function MarketingPage() {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState('');

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">AI Marketing Assistant</h1>
      <input className="input" placeholder="Campaign goal / product details" value={goal} onChange={(e) => setGoal(e.target.value)} />
      <button
        className="btn-primary"
        onClick={async () => {
          const res = await fetch('/api/ai/marketing', { method: 'POST', body: JSON.stringify({ goal }) });
          const data = await res.json();
          setResult(data.content || data.error || '');
        }}
      >
        Generate Ads + Emails + Product Copy
      </button>
      <textarea className="input min-h-80" value={result} onChange={(e) => setResult(e.target.value)} />
    </div>
  );
}

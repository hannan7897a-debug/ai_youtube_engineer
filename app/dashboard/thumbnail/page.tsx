'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ThumbnailPage() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">AI Thumbnail Generator</h1>
      <input className="input" placeholder="YouTube video topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      <button
        className="btn-primary"
        onClick={async () => {
          const res = await fetch('/api/ai/thumbnail', { method: 'POST', body: JSON.stringify({ topic }) });
          const data = await res.json();
          setIdeas(data.ideas || '');
          setImageUrl(data.imageUrl || '');
        }}
      >
        Generate Thumbnail Concepts
      </button>
      <textarea className="input min-h-52" value={ideas} onChange={(e) => setIdeas(e.target.value)} />
      {imageUrl ? <Image src={imageUrl} alt="Thumbnail" width={1024} height={1024} className="w-full rounded-lg" /> : null}
    </div>
  );
}

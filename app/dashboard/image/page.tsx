'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImagePage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">AI Image Generator</h1>
      <input className="input" placeholder="Describe the image you need" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button
        className="btn-primary"
        onClick={async () => {
          const res = await fetch('/api/ai/image', { method: 'POST', body: JSON.stringify({ prompt }) });
          const data = await res.json();
          setImageUrl(data.imageUrl || '');
        }}
      >
        Generate Image
      </button>
      {imageUrl ? (
        <div className="space-y-3">
          <Image src={imageUrl} alt="Generated" width={1024} height={1024} className="w-full rounded-lg" />
          <a className="btn-secondary inline-block" href={`/api/images/download?url=${encodeURIComponent(imageUrl)}`}>
            Download
          </a>
        </div>
      ) : null}
    </div>
  );
}

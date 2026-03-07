'use client';

import { useState } from 'react';

export default function ChatbotPage() {
  const [instructions, setInstructions] = useState('');
  const [prompt, setPrompt] = useState('');
  const [embedCode, setEmbedCode] = useState('');

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">AI Chatbot Builder</h1>
      <textarea className="input min-h-48" placeholder="Describe your chatbot behavior and knowledge" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      <button
        className="btn-primary"
        onClick={async () => {
          const res = await fetch('/api/ai/chat', { method: 'POST', body: JSON.stringify({ instructions }) });
          const data = await res.json();
          setPrompt(data.prompt || '');
          setEmbedCode(`<script src=\"${window.location.origin}/api/chatbot/embed\" data-prompt='${(data.prompt || '').replace(/'/g, '&apos;')}'></script>`);
        }}
      >
        Generate Prompt + Embed
      </button>
      <textarea className="input min-h-48" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <textarea className="input min-h-32" value={embedCode} onChange={(e) => setEmbedCode(e.target.value)} />
    </div>
  );
}

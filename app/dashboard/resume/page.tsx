'use client';

import { useState } from 'react';

export default function ResumePage() {
  const [payload, setPayload] = useState('{"name":"","experience":"","skills":""}');
  const [resume, setResume] = useState('');

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">AI Resume Builder</h1>
      <textarea className="input min-h-52" value={payload} onChange={(e) => setPayload(e.target.value)} />
      <button
        className="btn-primary"
        onClick={async () => {
          const res = await fetch('/api/ai/resume', { method: 'POST', body: payload });
          const data = await res.json();
          setResume(data.resume || data.error || '');
        }}
      >
        Generate Resume
      </button>
      <textarea className="input min-h-72" value={resume} onChange={(e) => setResume(e.target.value)} />
      <button
        className="btn-secondary"
        onClick={() => {
          const blob = new Blob([resume], { type: 'application/pdf' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'resume.pdf';
          a.click();
        }}
      >
        Download PDF
      </button>
    </div>
  );
}

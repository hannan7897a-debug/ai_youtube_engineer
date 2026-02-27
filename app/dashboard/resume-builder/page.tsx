'use client';
import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function ResumeBuilderPage() {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [resume, setResume] = useState('');

  const generate = async () => {
    const res = await fetch('/api/resume', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: (await supabaseClient.auth.getUser()).data.user?.id, name, experience, skills }) });
    const data = await res.json();
    setResume(data.resume || data.error);
  };

  return <main className="glass rounded-2xl p-6"><h1 className="text-xl font-semibold">AI Resume Builder</h1><input className="mt-3 w-full rounded-lg bg-slate-800 p-3" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} /><textarea className="mt-3 h-24 w-full rounded-lg bg-slate-800 p-3" placeholder="Work experience" value={experience} onChange={(e)=>setExperience(e.target.value)} /><input className="mt-3 w-full rounded-lg bg-slate-800 p-3" placeholder="Skills (comma separated)" value={skills} onChange={(e)=>setSkills(e.target.value)} /><button onClick={generate} className="mt-3 rounded-lg bg-violet-600 px-4 py-2">Generate Resume</button><textarea className="mt-4 h-72 w-full rounded-lg bg-slate-900 p-3" value={resume} readOnly /><button className="mt-3 rounded-lg border border-slate-700 px-4 py-2" onClick={()=>window.print()}>Download as PDF</button></main>;
}

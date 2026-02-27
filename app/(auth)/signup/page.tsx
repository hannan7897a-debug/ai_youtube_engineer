'use client';

import { FormEvent, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabaseClient.auth.signUp({ email, password });
    setMessage(error ? error.message : 'Check your email to confirm your account.');
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form onSubmit={onSubmit} className="glass w-full rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Create account</h1>
        <input className="mt-4 w-full rounded-xl bg-slate-800 p-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="mt-3 w-full rounded-xl bg-slate-800 p-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {message && <p className="mt-2 text-sm text-slate-300">{message}</p>}
        <button className="mt-4 w-full rounded-xl bg-violet-600 py-3">Sign up</button>
        <p className="mt-3 text-sm text-slate-300">Already have an account? <Link href="/login" className="text-violet-300">Login</Link></p>
      </form>
    </main>
  );
}

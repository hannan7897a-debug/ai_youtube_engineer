'use client';

import { FormEvent, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form onSubmit={onSubmit} className="glass w-full rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <input className="mt-4 w-full rounded-xl bg-slate-800 p-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="mt-3 w-full rounded-xl bg-slate-800 p-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
        <button className="mt-4 w-full rounded-xl bg-violet-600 py-3">Sign in</button>
        <p className="mt-3 text-sm text-slate-300">No account? <Link href="/signup" className="text-violet-300">Sign up</Link></p>
      </form>
    </main>
  );
}

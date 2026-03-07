'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const response =
      mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (response.error) {
      setError(response.error.message);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="card w-full max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">{mode === 'signup' ? 'Create account' : 'Welcome back'}</h1>
      <input className="input" placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        className="input"
        placeholder="Password"
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? 'Loading...' : mode === 'signup' ? 'Sign up' : 'Login'}
      </button>
    </form>
  );
}

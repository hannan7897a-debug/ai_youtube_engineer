'use client';

import { Sidebar } from '@/components/sidebar';
import { supabaseClient } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login');
      else setEmail(data.user.email || '');
    });
  }, [router]);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-4 md:flex-row">
      <Sidebar />
      <section className="flex-1">
        <header className="mb-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div>
            <p className="text-sm text-slate-400">Signed in as</p>
            <p>{email}</p>
          </div>
          <Link href="/dashboard/settings" className="rounded-lg border border-slate-700 px-3 py-2 text-sm">Profile</Link>
        </header>
        {children}
      </section>
    </div>
  );
}

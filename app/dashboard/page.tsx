'use client';
import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function DashboardPage() {
  const [usage, setUsage] = useState<{ feature: string; created_at: string }[]>([]);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabaseClient.auth.getUser();
      if (!userData.user) return;
      const { data } = await supabaseClient
        .from('usage_logs')
        .select('feature,created_at')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      setUsage(data || []);
    })();
  }, []);

  return (
    <main className="space-y-4">
      <div className="glass rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Welcome to AI Toolkit Pro</h1>
        <p className="mt-2 text-slate-300">Use the sidebar to access all AI tools.</p>
      </div>
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Recent Usage</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {usage.map((row, i) => (
            <li key={i}>{row.feature} — {new Date(row.created_at).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

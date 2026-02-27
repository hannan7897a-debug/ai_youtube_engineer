'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function AdminPage() {
  const [users, setUsers] = useState(0);
  const [subscriptions, setSubscriptions] = useState(0);
  const [usage, setUsage] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [{ count: userCount }, { count: subCount }, { data: usageData }] = await Promise.all([
        supabaseClient.from('users').select('*', { count: 'exact', head: true }),
        supabaseClient.from('subscriptions').select('*', { count: 'exact', head: true }),
        supabaseClient.from('usage_logs').select('*').order('created_at', { ascending: false }).limit(20),
      ]);
      setUsers(userCount || 0);
      setSubscriptions(subCount || 0);
      setUsage(usageData || []);
    })();
  }, []);

  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6"><h1 className="text-xl font-semibold">Admin Panel</h1><p className="text-slate-300">Users: {users}</p><p className="text-slate-300">Subscriptions: {subscriptions}</p></section>
      <section className="glass rounded-2xl p-6"><h2 className="font-semibold">Recent Usage</h2><ul className="mt-2 text-sm text-slate-300">{usage.map((u)=> <li key={u.id}>{u.user_id} — {u.feature} — {u.units_used}</li>)}</ul></section>
    </main>
  );
}

'use client';

import { supabaseClient } from '@/lib/supabase';

export function UpgradeButtons() {
  const checkout = async (plan: 'pro' | 'enterprise') => {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: (await supabaseClient.auth.getUser()).data.user?.id, plan }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || 'Failed to create checkout');
  };

  return (
    <div className="mt-4 flex gap-2">
      <button onClick={() => checkout('pro')} className="rounded-lg bg-violet-600 px-3 py-2 text-sm">Upgrade to Pro</button>
      <button onClick={() => checkout('enterprise')} className="rounded-lg border border-slate-600 px-3 py-2 text-sm">Upgrade to Enterprise</button>
    </div>
  );
}

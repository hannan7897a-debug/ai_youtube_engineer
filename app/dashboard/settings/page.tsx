'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';
import { UpgradeButtons } from '@/components/upgrade-buttons';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('free');

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabaseClient.auth.getUser();
      if (!userData.user) return;
      setEmail(userData.user.email || '');
      const { data: subscription } = await supabaseClient
        .from('subscriptions')
        .select('plan')
        .eq('user_id', userData.user.id)
        .maybeSingle();
      setPlan(subscription?.plan || 'free');
    })();
  }, []);

  return <main className="glass rounded-2xl p-6"><h1 className="text-xl font-semibold">Settings / Profile</h1><p className="mt-3 text-slate-300">Email: {email}</p><p className="text-slate-300">Current plan: {plan}</p><p className="text-slate-300">Default theme: Dark mode</p><UpgradeButtons /></main>;
}

import { supabaseAdmin } from '@/lib/supabase-admin';

export default async function AdminPage() {
  const [users, subscriptions, usageLogs] = await Promise.all([
    supabaseAdmin.from('users').select('*').limit(20),
    supabaseAdmin.from('subscriptions').select('*').limit(20),
    supabaseAdmin.from('usage_logs').select('*').order('created_at', { ascending: false }).limit(20)
  ]);

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <p className="text-sm text-slate-300">View users, subscriptions, and AI usage metrics.</p>
      </div>
      <div className="card overflow-x-auto">
        <h2 className="mb-3 font-semibold">Users</h2>
        <pre className="text-xs text-slate-300">{JSON.stringify(users.data || users.error, null, 2)}</pre>
      </div>
      <div className="card overflow-x-auto">
        <h2 className="mb-3 font-semibold">Subscriptions</h2>
        <pre className="text-xs text-slate-300">{JSON.stringify(subscriptions.data || subscriptions.error, null, 2)}</pre>
      </div>
      <div className="card overflow-x-auto">
        <h2 className="mb-3 font-semibold">Recent Usage</h2>
        <pre className="text-xs text-slate-300">{JSON.stringify(usageLogs.data || usageLogs.error, null, 2)}</pre>
      </div>
    </div>
  );
}

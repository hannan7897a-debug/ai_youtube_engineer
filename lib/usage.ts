import { supabaseAdmin } from './supabase-admin';

export async function logUsage(userId: string | undefined, tool: string, input: string) {
  if (!userId) return;
  await supabaseAdmin.from('usage_logs').insert({ user_id: userId, tool, input });
}

import { PLAN_LIMITS } from './config';
import { UsageKey } from './types';
import { supabaseAdmin } from './supabase';

export async function assertUsageAllowed(userId: string, feature: UsageKey) {
  const { data: subscription } = await supabaseAdmin
    .from('subscriptions')
    .select('plan,status')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();

  const plan = (subscription?.plan ?? 'free') as 'free' | 'pro' | 'enterprise';
  const { count } = await supabaseAdmin
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('feature', feature)
    .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

  const limit = PLAN_LIMITS[plan][feature];
  if ((count ?? 0) >= limit) throw new Error(`Usage limit reached for ${feature}`);

  await supabaseAdmin.from('usage_logs').insert({ user_id: userId, feature, units_used: 1 });
}

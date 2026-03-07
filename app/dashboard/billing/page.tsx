'use client';

const plans = [
  { name: 'Free', price: '$0', features: ['Basic access', 'Limited generations'], tier: 'free' },
  { name: 'Pro', price: '$29/mo', features: ['More usage', 'Priority generations'], tier: 'pro' },
  { name: 'Creator', price: '$79/mo', features: ['Highest limits', 'Best for teams'], tier: 'creator' }
] as const;

export default function BillingPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => (
        <div key={plan.name} className="card space-y-4">
          <h2 className="text-xl font-semibold">{plan.name}</h2>
          <p className="text-3xl font-bold">{plan.price}</p>
          <ul className="space-y-2 text-sm text-slate-300">
            {plan.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
          {plan.tier === 'free' ? (
            <button className="btn-secondary w-full">Current Plan</button>
          ) : (
            <button
              className="btn-primary w-full"
              onClick={async () => {
                const res = await fetch('/api/stripe/checkout', { method: 'POST', body: JSON.stringify({ plan: plan.tier }) });
                const data = await res.json();
                if (data.url) window.location.href = data.url;
              }}
            >
              Upgrade
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

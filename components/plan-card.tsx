import { ReactNode } from 'react';
import { Plan } from '@/lib/types';

export function PlanCard({
  plan,
  price,
  features,
  cta,
}: {
  plan: Plan;
  price: string;
  features: string[];
  cta?: ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold capitalize">{plan}</h3>
      <p className="mt-2 text-2xl font-bold">{price}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <div className="mt-5">{cta}</div>
    </div>
  );
}

import Link from 'next/link';
import { PlanCard } from '@/components/plan-card';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <section className="text-center">
        <p className="mb-4 inline-block rounded-full border border-violet-500/40 px-4 py-1 text-xs uppercase tracking-widest text-violet-300">Launch faster with AI</p>
        <h1 className="text-5xl font-bold tracking-tight">AI Toolkit Pro</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">A premium AI SaaS platform with content, image, resume, marketing, chatbot, and thumbnail generation in one modern dashboard.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/signup" className="rounded-xl bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500">Get Started</Link>
          <Link href="/login" className="rounded-xl border border-slate-700 px-5 py-3 font-medium">Login</Link>
        </div>
      </section>
      <section className="mt-14 grid gap-6 md:grid-cols-3">
        <PlanCard plan="free" price="$0" features={["Limited usage", "Core generators", "Community support"]} />
        <PlanCard plan="pro" price="$29/month" features={["Higher limits", "Priority queue", "Advanced exports"]} />
        <PlanCard plan="enterprise" price="$99/month" features={["Massive limits", "Team controls", "Priority support"]} />
      </section>
    </main>
  );
}

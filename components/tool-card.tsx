import Link from 'next/link';

export function ToolCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="card block transition hover:border-brand-500/70">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </Link>
  );
}

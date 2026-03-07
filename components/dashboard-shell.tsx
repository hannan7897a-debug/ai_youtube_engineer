import Link from 'next/link';

const links = [
  ['Overview', '/dashboard'],
  ['Content Writer', '/dashboard/content'],
  ['Image Generator', '/dashboard/image'],
  ['Resume Builder', '/dashboard/resume'],
  ['Marketing Assistant', '/dashboard/marketing'],
  ['Chatbot Builder', '/dashboard/chatbot'],
  ['Thumbnail Generator', '/dashboard/thumbnail'],
  ['Billing', '/dashboard/billing'],
  ['Admin', '/dashboard/admin']
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[240px_1fr]">
      <aside className="card h-fit">
        <h2 className="mb-4 text-xl font-semibold">CreatorAI</h2>
        <nav className="space-y-2 text-sm">
          {links.map(([label, href]) => (
            <Link className="block rounded-lg px-3 py-2 hover:bg-slate-800" key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="space-y-6">{children}</section>
    </div>
  );
}

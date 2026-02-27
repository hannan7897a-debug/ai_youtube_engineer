import Link from 'next/link';
import { Bot, FileText, ImageIcon, LayoutDashboard, Megaphone, Settings, Sparkles, Wand2 } from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/content-writer', label: 'AI Content Writer', icon: FileText },
  { href: '/dashboard/image-generator', label: 'AI Image Generator', icon: ImageIcon },
  { href: '/dashboard/resume-builder', label: 'AI Resume Builder', icon: Sparkles },
  { href: '/dashboard/marketing-assistant', label: 'AI Marketing Assistant', icon: Megaphone },
  { href: '/dashboard/chatbot-builder', label: 'AI Chatbot Builder', icon: Bot },
  { href: '/dashboard/thumbnail-generator', label: 'AI Thumbnail Generator', icon: Wand2 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/admin', label: 'Admin Panel', icon: LayoutDashboard },
];

export function Sidebar() {
  return (
    <aside className="glass w-full max-w-xs rounded-2xl p-4 shadow-glow">
      <h2 className="mb-4 text-lg font-semibold">AI Toolkit Pro</h2>
      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
            <Icon size={16} /> {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

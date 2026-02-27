import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Toolkit Pro',
  description: 'All-in-one AI SaaS toolkit for creators, marketers, and teams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">{children}</div>
      </body>
    </html>
  );
}

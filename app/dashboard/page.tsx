import { LogoutButton } from '@/components/logout-button';
import { ToolCard } from '@/components/tool-card';

const tools = [
  ['AI Content Writer', 'Generate blogs, scripts, and articles in multiple tones.', '/dashboard/content'],
  ['AI Image Generator', 'Create and download AI images from prompts.', '/dashboard/image'],
  ['AI Resume Builder', 'Generate polished resumes and export PDF.', '/dashboard/resume'],
  ['AI Marketing Assistant', 'Create ads, emails, and product copy.', '/dashboard/marketing'],
  ['AI Chatbot Builder', 'Generate prompts and embed snippets.', '/dashboard/chatbot'],
  ['AI Thumbnail Generator', 'Create thumbnail ideas and visuals.', '/dashboard/thumbnail']
] as const;

export default function DashboardHomePage() {
  return (
    <>
      <div className="card flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-300">Welcome to your CreatorAI Suite control center.</p>
        </div>
        <LogoutButton />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map(([title, description, href]) => (
          <ToolCard key={title} title={title} description={description} href={href} />
        ))}
      </div>
    </>
  );
}

import Link from 'next/link';

const features = [
  'AI Content Writer',
  'AI Image Generator',
  'AI Resume Builder',
  'AI Marketing Assistant',
  'AI Chatbot Builder',
  'AI Thumbnail Generator'
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-4 rounded-full border border-brand-500/50 px-4 py-1 text-xs uppercase tracking-[0.2em] text-brand-500">
        CreatorAI Suite
      </span>
      <h1 className="text-4xl font-bold sm:text-6xl">Build, scale, and monetize your AI creator workflow.</h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        Ship content, images, resumes, marketing campaigns, chatbots, and thumbnails from one modern SaaS dashboard.
      </p>
      <div className="mt-8 flex gap-4">
        <Link className="btn-primary" href="/auth/signup">
          Get Started
        </Link>
        <Link className="btn-secondary" href="/auth/login">
          Login
        </Link>
      </div>
      <div className="mt-12 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature} className="card text-left">
            <h2 className="font-semibold">{feature}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}

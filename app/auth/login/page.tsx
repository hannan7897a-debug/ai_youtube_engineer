import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="space-y-4">
        <AuthForm mode="login" />
        <p className="text-center text-sm text-slate-400">
          No account? <Link className="text-brand-500" href="/auth/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
}

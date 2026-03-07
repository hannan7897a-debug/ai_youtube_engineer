import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="space-y-4">
        <AuthForm mode="signup" />
        <p className="text-center text-sm text-slate-400">
          Already have an account? <Link className="text-brand-500" href="/auth/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

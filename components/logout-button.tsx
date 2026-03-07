'use client';

import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      className="btn-secondary"
      onClick={async () => {
        const supabase = getSupabaseBrowserClient();
        await supabase.auth.signOut();
        router.push('/auth/login');
        router.refresh();
      }}
    >
      Logout
    </button>
  );
}

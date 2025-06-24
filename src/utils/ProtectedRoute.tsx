// utils/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './supabaseClient';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentSession = data.session;

      if (!currentSession) {
        router.push('/login');
      } else {
        setSession(currentSession);
      }
      setLoading(false);
    };

    getSession();
  }, [router]);

  if (loading) return <div className="text-white">Loading...</div>;
  return <>{session && children}</>;
}

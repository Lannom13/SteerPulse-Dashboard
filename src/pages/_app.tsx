// File: /pages/_app.tsx
import '../styles/index.css'; // Tailwind base
import Sidebar from '../components/Sidebar';
import DashboardLayout from '../layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }: any) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  const isAuthPage = router.pathname === '/login';

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <div className="flex min-h-screen bg-background">
        {!isAuthPage && <Sidebar />}
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </div>
    </SessionContextProvider>
  );
}

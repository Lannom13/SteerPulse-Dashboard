// pages/_app.tsx
import '../styles/index.css'; // Tailwind base
import Sidebar from '../src/components/Sidebar';
import DashboardLayout from '../src/layouts/DashboardLayout';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Sidebar + layout only on protected pages
  const showShell = !['/login'].includes(router.pathname);

  return (
    <div className="flex bg-background min-h-screen">
      {showShell && <Sidebar />}
      {showShell ? (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

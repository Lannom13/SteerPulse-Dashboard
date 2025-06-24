import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../utils/supabaseClient'; // create this if you don’t have it

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="max-w-md w-full p-6 bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login to SteerPulse</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]} // Email only for now
        />
      </div>
    </div>
  );
}

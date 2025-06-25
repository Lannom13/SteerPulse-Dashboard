// File: /src/components/PlaidConnectButton.tsx
import { useEffect, useState } from 'react';
import { PlaidLink, PlaidLinkOnSuccessMetadata } from 'react-plaid-link';

interface PlaidConnectButtonProps {
  userId: string;
}

export default function PlaidConnectButton({ userId }: PlaidConnectButtonProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const res = await fetch(
          'https://lpczocldblkfrhnlpqgf.functions.supabase.co/create_link_token',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          }
        );

        if (!res.ok) {
          const errText = await res.text();
          console.error('❌ Failed to create link token:', errText);
          return;
        }

        const data = await res.json();
        console.log('✅ Link token response:', data);
        setLinkToken(data.link_token);
      } catch (err) {
        console.error('🚨 Error creating link token:', err);
      }
    };

    createLinkToken();
  }, [userId]);

  const handleSuccess = async (
    public_token: string,
    metadata: PlaidLinkOnSuccessMetadata
  ) => {
    try {
      const res = await fetch(
        'https://lpczocldblkfrhnlpqgf.functions.supabase.co/exchange_public_token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error('❌ Failed to exchange public token:', errText);
        alert('Something went wrong exchanging tokens.');
        return;
      }

      const data = await res.json();
      console.log('✅ Exchange token response:', data);
      alert('✅ Bank linked successfully!');
    } catch (err) {
      console.error('🚨 Error exchanging public token:', err);
    }
  };

  if (!linkToken) return <p className="text-gray-400">Loading Plaid link...</p>;

  return (
    <PlaidLink token={linkToken} onSuccess={handleSuccess}>
      Connect a Bank
    </PlaidLink>
  );
}

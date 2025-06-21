import { useEffect, useState } from "react";
import { PlaidLink } from "react-plaid-link";

function PlaidConnectButton({ userId }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await fetch(
        "https://<your-project-id>.functions.supabase.co/create_link_token", // 👈 REPLACE THIS
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await res.json();
      setLinkToken(data.link_token);
    };

    createLinkToken();
  }, [userId]);

  const handleSuccess = async (public_token, metadata) => {
    await fetch(
      "https://<your-project-id>.functions.supabase.co/exchange_public_token", // 👈 REPLACE THIS TOO
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token }),
      }
    );
    alert("Bank linked successfully!");
  };

  if (!linkToken) return <p>Loading Plaid link...</p>;

  return (
    <PlaidLink token={linkToken} onSuccess={handleSuccess}>
      Connect a Bank
    </PlaidLink>
  );
}

export default PlaidConnectButton;

import { useEffect, useState } from "react";
import { PlaidLink } from "react-plaid-link";

function PlaidConnectButton({ userId }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await fetch(
        "https://lpczocldblkfrhnlpqgf.functions.supabase.co/create_link_token",
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
    const res = await fetch(
      "https://lpczocldblkfrhnlpqgf.functions.supabase.co/exchange_public_token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token }),
      }
    );
    const data = await res.json();
    console.log("Exchange result:", data);
    alert("✅ Bank linked successfully!");
  };

  if (!linkToken) return <p>Loading Plaid link...</p>;

  return (
    <PlaidLink token={linkToken} onSuccess={handleSuccess}>
      Connect a Bank
    </PlaidLink>
  );
}

export default PlaidConnectButton;

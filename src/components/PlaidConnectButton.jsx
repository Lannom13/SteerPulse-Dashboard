import { useEffect, useState } from "react";
import { PlaidLink } from "react-plaid-link";

function PlaidConnectButton({ userId }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await fetch("/functions/v1/create_link_token", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setLinkToken(data.link_token);
    };

    createLinkToken();
  }, [userId]);

  const handleSuccess = async (public_token, metadata) => {
    console.log("Success! public_token:", public_token);
    await fetch("/functions/v1/exchange_public_token", {
      method: "POST",
      body: JSON.stringify({ public_token }),
    });
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

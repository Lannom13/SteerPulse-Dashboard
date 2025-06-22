import { useEffect, useState } from "react";

export default function useNetWorth() {
  const [netWorth, setNetWorth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          "https://lpczocldblkfrhnlpqgf.functions.supabase.co/get_accounts"
        );
        const data = await res.json();

        if (!data.accounts) throw new Error("No accounts returned");

        const total = data.accounts.reduce((sum, acc) => {
          return sum + (acc.balances?.available || 0);
        }, 0);

        setNetWorth(total);
      } catch (err) {
        console.error("Failed to fetch net worth", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { netWorth, loading };
}

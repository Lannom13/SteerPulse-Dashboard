import { useEffect, useState } from "react";

interface Account {
  balances?: {
    available: number;
  };
}

export default function useNetWorth() {
  const [netWorth, setNetWorth] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          "https://lpczocldblkfrhnlpqgf.functions.supabase.co/get_accounts"
        );
        const data = await res.json();

        if (!data.accounts || !Array.isArray(data.accounts)) {
          throw new Error("No valid accounts returned");
        }

        const total = data.accounts.reduce((sum: number, acc: Account) => {
          return sum + (acc.balances?.available || 0);
        }, 0);

        setNetWorth(total);
      } catch (err) {
        console.error("❌ Failed to fetch net worth", err);
        setNetWorth(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { netWorth, loading };
}

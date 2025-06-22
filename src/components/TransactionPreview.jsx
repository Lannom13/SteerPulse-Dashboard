import { useEffect, useState } from "react";

export default function TransactionPreview() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 Hardcoded token just for now
  const accessToken = "access-sandbox-faa089fa-42f2-4391-bda3-371a90ba4987";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          "https://lpczocldblkfrhnlpqgf.functions.supabase.co/get_transactions",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: accessToken }),
          }
        );

        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        console.error("❌ Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accessToken]);

  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">🔁 Recent Transactions</h2>
      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <ul className="divide-y divide-gray-700 max-h-64 overflow-y-auto pr-2">
          {transactions.map((txn) => (
            <li
              key={txn.transaction_id}
              className="py-2 flex justify-between text-sm text-gray-300"
            >
              <span>{txn.name || "Unnamed"}</span>
              <span
                className={`font-mono ${
                  txn.amount < 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-gray-500 mt-3">* synced via Plaid</p>
    </div>
  );
}

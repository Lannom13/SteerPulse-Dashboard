// src/components/TransactionPreview.jsx
const mockTransactions = [
  { id: 1, name: 'Kroger Grocery', amount: -56.42, date: '2025-06-18' },
  { id: 2, name: 'Netflix', amount: -15.99, date: '2025-06-17' },
  { id: 3, name: 'Paycheck Deposit', amount: 2200, date: '2025-06-15' },
  { id: 4, name: 'Chick-fil-A', amount: -12.35, date: '2025-06-14' },
  { id: 5, name: 'Target', amount: -86.70, date: '2025-06-13' }
]

export default function TransactionPreview() {
  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">🔁 Recent Transactions</h2>
      <ul className="divide-y divide-gray-700 max-h-64 overflow-y-auto pr-2">
        {mockTransactions.map(txn => (
          <li key={txn.id} className="py-2 flex justify-between text-sm text-gray-300">
            <span>{txn.name}</span>
            <span
              className={`font-mono ${
                txn.amount < 0 ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500 mt-3">* synced via Plaid (coming soon)</p>
    </div>
  )
}

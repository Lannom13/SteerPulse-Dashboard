// src/components/InvestmentSnapshot.jsx
export default function InvestmentSnapshot() {
  const data = {
    total: 24870.45,
    change: 312.78,
    changePercent: 1.27,
    holdings: [
      { symbol: 'VTI', value: 10400, type: 'ETF' },
      { symbol: 'AAPL', value: 6800, type: 'Stock' },
      { symbol: '401k', value: 7670.45, type: 'Retirement' }
    ]
  }

  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">📈 Investment Snapshot</h2>
      <div className="text-xl font-semibold text-white">
        ${data.total.toLocaleString()}
        <span
          className={`ml-2 text-sm ${
            data.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          ({data.change >= 0 ? '+' : ''}
          {data.change.toFixed(2)} / {data.changePercent.toFixed(2)}%)
        </span>
      </div>

      <ul className="mt-4 text-sm text-gray-300 space-y-2">
        {data.holdings.map((h) => (
          <li key={h.symbol} className="flex justify-between border-b border-gray-700 pb-1">
            <span>{h.symbol} <span className="text-xs text-gray-500">({h.type})</span></span>
            <span className="font-mono">${h.value.toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-gray-500">* synced via Plaid or manual import in future</p>
    </div>
  )
}

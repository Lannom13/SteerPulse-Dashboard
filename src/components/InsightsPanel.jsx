// src/components/InsightsPanel.jsx
import { useState } from 'react';

export default function InsightsPanel({ category, onClose }) {
  // Mock merchant breakdowns by category
  const mockData = {
    "Fast Food": [
      { merchant: "Taco Bell", amount: 75, percent: 50 },
      { merchant: "Chick-Fil-A", amount: 45, percent: 30 },
      { merchant: "Dominos", amount: 30, percent: 20 }
    ],
    "Groceries": [
      { merchant: "Publix", amount: 200, percent: 40 },
      { merchant: "Walmart", amount: 150, percent: 30 },
      { merchant: "Kroger", amount: 150, percent: 30 }
    ]
  };

  const merchants = mockData[category] || [];

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-gray-900 shadow-lg border-l border-gray-700 z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">🔍 Insights: {category}</h2>
        <button className="text-gray-400 hover:text-white" onClick={onClose}>✕</button>
      </div>

      {merchants.length > 0 ? (
        <ul className="space-y-3">
          {merchants.map((m, idx) => (
            <li key={idx} className="bg-gray-800 rounded-lg px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-white font-medium">{m.merchant}</p>
                <p className="text-sm text-gray-400">${m.amount} • {m.percent}%</p>
              </div>
              <div className="w-1/3 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full" style={{ width: `${m.percent}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No insights available for this category yet.</p>
      )}
    </div>
  );
}

// src/components/InsightsPanel.jsx
import { useState } from 'react';

export default function InsightsPanel({ category, onClose }) {
  // Mock merchant breakdowns by category
  const mockData = {
    "Fast Food": [
      {
        merchant: "Taco Bell",
        amount: 75,
        percent: 50,
        transactions: [
          { date: "6/11", amount: 30 },
          { date: "6/17", amount: 45 }
        ]
      },
      {
        merchant: "Chick-Fil-A",
        amount: 45,
        percent: 30,
        transactions: [
          { date: "6/10", amount: 20 },
          { date: "6/18", amount: 25 }
        ]
      },
      {
        merchant: "Dominos",
        amount: 30,
        percent: 20,
        transactions: [
          { date: "6/09", amount: 15 },
          { date: "6/16", amount: 15 }
        ]
      }
    ],
    "Groceries": [
      {
        merchant: "Walmart",
        amount: 200,
        percent: 50,
        transactions: [
          { date: "6/11", amount: 100 },
          { date: "6/17", amount: 100 }
        ]
      },
      {
        merchant: "Publix",
        amount: 120,
        percent: 30,
        transactions: [
          { date: "6/08", amount: 60 },
          { date: "6/15", amount: 60 }
        ]
      },
      {
        merchant: "Kroger",
        amount: 80,
        percent: 20,
        transactions: [
          { date: "6/05", amount: 40 },
          { date: "6/12", amount: 40 }
        ]
      }
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
        <ul className="space-y-6">
          {merchants.map((m, idx) => (
            <li key={idx} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-white font-medium">{m.merchant}</p>
                  <p className="text-sm text-gray-400">${m.amount} • {m.percent}%</p>
                </div>
                <div className="w-1/3 h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="bg-sky-400 h-full" style={{ width: `${m.percent}%` }}></div>
                </div>
              </div>
              <ul className="ml-2 mt-2 text-sm text-gray-300">
                {m.transactions.map((t, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{t.date}</span>
                    <span>${t.amount}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No insights available for this category yet.</p>
      )}
    </div>
  );
}

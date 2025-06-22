// src/components/AddRowModal.jsx
import { useState } from 'react';

const GROUPS = [
  'Housing', 'Transportation', 'Insurance', 'Childcare', 'Gas', 'Internet',
  'Donations', 'Food', 'Entertainment', 'Utilities', 'Miscellaneous',
  'Debt', 'Savings', 'Investments'
];

const SUBCATEGORY_MAP = {
  Food: ['Groceries', 'Fast Food', 'Restaurants'],
  Transportation: ['Gas', 'Car Payment', 'Bus Fare'],
  Entertainment: ['Movies', 'Streaming', 'Concerts'],
  Housing: ['Rent', 'Utilities', 'Internet'],
  Debt: ['Credit Card', 'Student Loan', 'Car Loan']
};

export default function AddRowModal({ onClose, onAdd }) {
  const [group, setGroup] = useState('');
  const [category, setCategory] = useState('');
  const [planned, setPlanned] = useState('');

  const suggestions = SUBCATEGORY_MAP[group] || [];

  const handleAdd = () => {
    if (!group || !category) return;
    onAdd({ group, category, planned: Number(planned) || 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold text-white mb-4">Add New Budget Row</h2>
        
        <label className="block text-sm text-gray-300 mb-1">Group</label>
        <select
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white"
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
            setCategory(''); // reset category on group change
          }}
        >
          <option value="">Select Group</option>
          {GROUPS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label className="block text-sm text-gray-300 mb-1">Category</label>
        <select
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {suggestions.map((sub, idx) => (
            <option key={idx} value={sub}>{sub}</option>
          ))}
        </select>

        <label className="block text-sm text-gray-300 mb-1">Planned Amount</label>
        <input
          type="number"
          className="w-full mb-4 px-3 py-2 rounded bg-gray-800 text-white"
          value={planned}
          onChange={(e) => setPlanned(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="px-4 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

const GROUPS = [
  'Income', 'Food', 'Housing', 'Lifestyle', 'Transportation',
  'Insurance', 'Childcare', 'Donations', 'Utilities',
  'Miscellaneous', 'Debt', 'Savings', 'Investments'
];

export default function AddRowModal({ onClose, onAdd, defaultGroup = '' }) {
  const [group, setGroup] = useState(defaultGroup);
  const [category, setCategory] = useState('');
  const [planned, setPlanned] = useState('');

  const handleAdd = () => {
    if (!group || !category || planned === '') {
      alert("Please fill out all fields.");
      return;
    }

    const numericPlanned = Number(planned);
    if (isNaN(numericPlanned) || numericPlanned < 0) {
      alert("Planned amount must be a valid number.");
      return;
    }

    onAdd({ group, category, planned: numericPlanned });
    onClose();
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') handleAdd();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [group, category, planned]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold text-white mb-4">Add New Budget Row</h2>

        <label className="block text-sm text-gray-300 mb-1">Group</label>
        <select
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="">Select Group</option>
          {GROUPS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label className="block text-sm text-gray-300 mb-1">Category</label>
        <input
          type="text"
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Freelance"
        />

        <label className="block text-sm text-gray-300 mb-1">Planned Amount</label>
        <input
          type="number"
          className="w-full mb-4 px-3 py-2 rounded bg-gray-800 text-white"
          value={planned}
          onChange={(e) => setPlanned(e.target.value)}
          placeholder="e.g. 200"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

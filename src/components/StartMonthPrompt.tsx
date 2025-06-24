// components/StartMonthPrompt.tsx

interface StartMonthPromptProps {
  isOpen: boolean;
  month: string;
  hasPreviousMonth: boolean;
  onChoice: (choice: 'copy' | 'coach' | 'fresh') => void;
  onCancel: () => void;
}

export default function StartMonthPrompt({
  isOpen,
  month,
  hasPreviousMonth,
  onChoice,
  onCancel
}: StartMonthPromptProps) {
  if (!isOpen) return null;

  const formattedMonth = new Date(month + '-01').toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full shadow-xl text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Let’s set up your {formattedMonth} budget</h2>

        <div className="space-y-3">
          <button
            className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded text-left disabled:opacity-40"
            onClick={() => onChoice('copy')}
            disabled={!hasPreviousMonth}
          >
            📋 Copy last month’s budget
            {!hasPreviousMonth && <div className="text-xs text-gray-400">Not available yet</div>}
          </button>

          <button
            className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded text-left disabled:opacity-40"
            onClick={() => onChoice('coach')}
            disabled={!hasPreviousMonth}
          >
            🧠 Let Financial Coach build a smart plan
            {!hasPreviousMonth && <div className="text-xs text-gray-400">Not available yet</div>}
          </button>

          <button
            className="w-full bg-sky-600 hover:bg-sky-700 px-4 py-3 rounded text-left"
            onClick={() => onChoice('fresh')}
          >
            ➕ Start from scratch (default structure)
          </button>
        </div>

        <div className="mt-6 text-center">
          <button onClick={onCancel} className="text-sm text-gray-400 hover:text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

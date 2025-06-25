// File: /src/components/BudgetCategoryCard.tsx
interface BudgetCategoryCardProps {
  title: string;
  spent: number;
  budget: number;
  color?: string;
  onDelete?: () => void;
}

export default function BudgetCategoryCard({ title, spent, budget, color = 'sky', onDelete }: BudgetCategoryCardProps) {
  const percent = Math.min((spent / budget) * 100, 100);
  const barColor = `bg-${color}-500`;

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow transition-transform duration-300 hover:scale-[1.02] relative group">
      <h2 className="text-white text-md font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-300 mb-1">
        ${spent.toLocaleString()} of ${budget.toLocaleString()}
      </p>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-400 mt-2">{percent.toFixed(0)}% used</div>

      {onDelete && (
        <button
          onClick={onDelete}
          title="Delete Category"
          className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          🗑️
        </button>
      )}
    </div>
  );
}

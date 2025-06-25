// File: /src/components/BudgetBreakdownTable.tsx
interface BudgetItem {
  category: string;
  budget: number;
  spent: number;
}

interface BudgetBreakdownTableProps {
  data: BudgetItem[];
}

export default function BudgetBreakdownTable({ data }: BudgetBreakdownTableProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow mt-10">
      <h2 className="text-white text-md font-semibold mb-2">📊 Budget Breakdown</h2>
      <table className="w-full text-sm text-left text-gray-300">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th className="py-1">Category</th>
            <th className="py-1">Budget</th>
            <th className="py-1">Spent</th>
            <th className="py-1">Δ</th>
            <th className="py-1">% Used</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const diff = item.budget - item.spent;
            const percent = ((item.spent / item.budget) * 100).toFixed(0);
            const isOver = diff < 0;
            return (
              <tr key={item.category} className="border-b border-gray-700">
                <td>{item.category}</td>
                <td>${item.budget.toLocaleString()}</td>
                <td>${item.spent.toLocaleString()}</td>
                <td className={isOver ? 'text-red-400' : 'text-green-400'}>
                  {isOver ? '+' : '-'}${Math.abs(diff).toLocaleString()}
                </td>
                <td>{percent}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

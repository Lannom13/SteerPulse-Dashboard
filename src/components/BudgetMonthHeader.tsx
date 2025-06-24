// components/BudgetMonthHeader.tsx
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

export default function BudgetMonthHeader({ month, onPrev, onNext, onOpenPicker }) {
  return (
    <div className="flex items-center justify-between py-4 px-4 bg-gray-900 rounded-xl shadow mb-6">
      <button onClick={onPrev} className="hover:text-white text-gray-400 flex items-center gap-2">
        <ChevronLeft size={18} /> Previous
      </button>
      <div className="text-white font-semibold text-lg">{formatMonth(month)}</div>
      <div className="flex items-center gap-3">
        <button onClick={onNext} className="hover:text-white text-gray-400 flex items-center gap-2">
          Next <ChevronRight size={18} />
        </button>
        <button onClick={onOpenPicker} className="hover:text-white text-gray-400">
          <CalendarDays size={18} />
        </button>
      </div>
    </div>
  );
}

function formatMonth(monthString: string) {
  const [year, month] = monthString.split('-');
  return new Date(+year, +month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
}

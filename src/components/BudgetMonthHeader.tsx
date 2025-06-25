// File: /src/components/BudgetMonthHeader.tsx
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface BudgetMonthHeaderProps {
  month: string;
  onPrev: () => void;
  onNext: () => void;
  onOpenPicker: () => void;
}

export default function BudgetMonthHeader({
  month,
  onPrev,
  onNext,
  onOpenPicker
}: BudgetMonthHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4 px-4 bg-gray-900 rounded-xl shadow mb-6">
      <button onClick={onPrev} className="hover:text-white text-gray-400 flex items-center gap-2">
        <ChevronLeft />
        Previous
      </button>
      <div className="text-white font-semibold flex items-center gap-2 cursor-pointer" onClick={onOpenPicker}>
        <CalendarDays size={18} />
        {month}
      </div>
      <button onClick={onNext} className="hover:text-white text-gray-400 flex items-center gap-2">
        Next
        <ChevronRight />
      </button>
    </div>
  );
}

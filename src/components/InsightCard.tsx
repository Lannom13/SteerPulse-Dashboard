// File: /src/components/InsightCard.tsx
interface InsightCardProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export default function InsightCard({ title, message, type = 'info' }: InsightCardProps) {
  const colors: Record<string, string> = {
    info: 'bg-blue-900 text-blue-300 border-blue-500',
    success: 'bg-green-900 text-green-300 border-green-500',
    warning: 'bg-yellow-900 text-yellow-300 border-yellow-500',
    error: 'bg-red-900 text-red-300 border-red-500'
  };

  return (
    <div className={`p-4 rounded-xl shadow border ${colors[type]} space-y-2`}>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}

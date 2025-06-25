// File: /src/components/KpiCard.tsx
interface KpiCardProps {
  title: string;
  value: string;
  scenario: string;
}

export default function KpiCard({ title, value, scenario }: KpiCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow flex flex-col justify-between">
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-2">Scenario: {scenario}</div>
    </div>
  );
}

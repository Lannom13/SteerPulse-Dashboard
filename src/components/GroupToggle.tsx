// File: /src/components/GroupToggle.tsx
interface GroupToggleProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function GroupToggle({ label, isOpen, onToggle }: GroupToggleProps) {
  return (
    <tr className="bg-gray-900 border-t border-gray-700 cursor-pointer" onClick={onToggle}>
      <td colSpan={8} className="px-4 py-2 text-white font-semibold">
        <span className="inline-block w-4 text-center mr-2">{isOpen ? '▾' : '▸'}</span>
        {label}
      </td>
    </tr>
  );
}

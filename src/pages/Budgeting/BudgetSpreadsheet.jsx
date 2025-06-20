import AnimatedPage from '../../components/AnimatedPage'

export default function BudgetSpreadsheet() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-2">📋 Budget Spreadsheet</h1>
        <p className="text-sm text-gray-400 mb-6">This will eventually be a full editable spreadsheet powered by Supabase + Plaid.</p>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Placeholder table coming soon.</p>
        </div>
      </div>
    </AnimatedPage>
  )
}

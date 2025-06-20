import AnimatedPage from '../components/AnimatedPage'

export default function BudgetHistory() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">📅 Budget History</h1>
        <p className="text-sm text-gray-400">
          View how your spending and budget categories have changed over time.
        </p>
      </div>
    </AnimatedPage>
  )
}

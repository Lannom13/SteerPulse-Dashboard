import AnimatedPage from '../components/AnimatedPage'

export default function Notifications() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h2 className="text-2xl font-semibold mb-4">🔔 Notifications Center</h2>
        <p className="text-gray-400">
          This is where you’ll see real-time alerts like:
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-300">
          <li>Upcoming bills or payment reminders</li>
          <li>Budget category alerts (over/under)</li>
          <li>New feature announcements</li>
          <li>Account sync or Plaid errors</li>
        </ul>
        <p className="mt-4 text-sm text-gray-500">
          Eventually, this will support filtering, badges, and user-configurable preferences.
        </p>
      </div>
    </AnimatedPage>
  )
}

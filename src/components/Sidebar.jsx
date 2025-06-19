// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom'

const mainNav = [
  { name: 'Overview', path: '/overview' },
  { name: 'Budgeting', path: '/budgeting' },
  { name: 'Cash Flow', path: '/cashflow' },
  { name: 'Debt', path: '/debt' },
  { name: 'Investments', path: '/investments' },
  { name: 'Transactions', path: '/transactions' },
  { name: 'Recurring', path: '/recurring' },
  { name: 'Goals', path: '/goals' },
]

const insightsNav = [
  { name: 'Insights', path: '/insights' },
  { name: 'Notifications', path: '/notifications' },
]

const settingsNav = [
  { name: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-900 text-white p-4 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Steer<span className="text-brand-500">Pulse</span>
        </h1>
        <nav className="space-y-2">
          {mainNav.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition-all ${
                  isActive ? 'bg-brand-500 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6 border-t border-gray-800 pt-4 space-y-2">
          {insightsNav.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition-all ${
                  isActive ? 'bg-brand-500 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-800">
        {settingsNav.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition-all ${
                isActive ? 'bg-brand-500 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

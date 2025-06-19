// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom'

const topNav = [
  { name: 'Overview', path: '/overview' },
  { name: 'Budgeting', path: '/budgeting' },
  { name: 'Cash Flow', path: '/cashflow' },
  { name: 'Debt', path: '/debt' },
  { name: 'Transactions', path: '/transactions' },
  { name: 'Recurring', path: '/recurring' },
  { name: 'Investments', path: '/investments' },
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
          {topNav.map(({ name, path }) => (
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
      </div>

      <div className="pt-6 border-t border-gray-800">
        <nav className="space-y-2">
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
        </nav>
      </div>
    </aside>
  )
}

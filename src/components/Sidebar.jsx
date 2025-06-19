// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom'

const navItems = [
  { name: 'Budgeting', path: '/budgeting' },
  { name: 'Cash Flow', path: '/cashflow' },
  { name: 'Debt', path: '/debt' },
  { name: 'Transactions', path: '/transactions' },
  { name: 'Recurring', path: '/recurring' },
  { name: 'Settings', path: '/settings' },
  { name: 'Insights', path: '/insights' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-900 text-white p-4 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Steer<span className="text-brand-500">Pulse</span></h1>
      <nav className="space-y-2">
        {navItems.map(({ name, path }) => (
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
    </aside>
  )
}

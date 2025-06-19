// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import DashboardLayout from './layouts/DashboardLayout'

// Import all page components
import Overview from './pages/Overview'
import Budgeting from './pages/Budgeting'
import CashFlow from './pages/CashFlow'
import Debt from './pages/Debt'
import Transactions from './pages/Transactions'
import Recurring from './pages/Recurring'
import Investments from './pages/Investments'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="flex bg-background min-h-screen">
        <Sidebar />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/budgeting" element={<Budgeting />} />
            <Route path="/cashflow" element={<CashFlow />} />
            <Route path="/debt" element={<Debt />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/recurring" element={<Recurring />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </DashboardLayout>
      </div>
    </Router>
  )
}

export default App

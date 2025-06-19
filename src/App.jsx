// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import DashboardLayout from './layouts/DashboardLayout'

import Budgeting from './pages/Budgeting'
import CashFlow from './pages/CashFlow'
import Debt from './pages/Debt'
import Transactions from './pages/Transactions'
import Recurring from './pages/Recurring'
import Settings from './pages/Settings'
import Insights from './pages/Insights'

function App() {
  return (
    <Router>
      <div className="flex bg-background min-h-screen">
        <Sidebar />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/budgeting" />} />
            <Route path="/budgeting" element={<Budgeting />} />
            <Route path="/cashflow" element={<CashFlow />} />
            <Route path="/debt" element={<Debt />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/recurring" element={<Recurring />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </DashboardLayout>
      </div>
    </Router>
  )
}

export default App

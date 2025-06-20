import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import DashboardLayout from './layouts/DashboardLayout'

// Budgeting Views
import BudgetDashboard from './pages/Budgeting/Dashboard'
import BudgetSpreadsheet from './pages/Budgeting/BudgetSpreadsheet'

// Core Pages
import Overview from './pages/Overview'
import Investments from './pages/Investments'
import Debt from './pages/Debt'
import Transactions from './pages/Transactions'
import Recurring from './pages/Recurring'
import Goals from './pages/Goals'
import Insights from './pages/Insights'
import Notifications from './pages/Notifications'
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

            {/* Budgeting Routes */}
            <Route path="/budgeting" element={<BudgetDashboard />} />
            <Route path="/budgeting/spreadsheet" element={<BudgetSpreadsheet />} />

            {/* Other Main Tabs */}
            <Route path="/investments" element={<Investments />} />
            <Route path="/debt" element={<Debt />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/recurring" element={<Recurring />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </DashboardLayout>
      </div>
    </Router>
  )
}

export default App

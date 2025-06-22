// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Overview from './pages/Overview';
import Dashboard from './pages/Budgeting/Dashboard';
import BudgetSpreadsheet from './pages/Budgeting/BudgetSpreadsheet';
import Charts from './pages/Budgeting/Charts';
import InvestmentsOverview from './pages/Investments/Overview';
import Brokerage from './pages/Investments/Brokerage';
import Retirement from './pages/Investments/Retirement';
import Education from './pages/Investments/Education';
import Goals from './pages/Goals';
import Recurring from './pages/Recurring'; // ✅ new import

function App() {
  return (
    <Router>
      <div className="flex bg-background min-h-screen">
        <Sidebar />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Overview />} />

            {/* Budgeting */}
            <Route path="/budgeting" element={<Dashboard />} />
            <Route path="/budgeting/spreadsheet" element={<BudgetSpreadsheet />} />
            <Route path="/budgeting/charts" element={<Charts />} />

            {/* Investments */}
            <Route path="/investments" element={<Navigate to="/investments/overview" />} />
            <Route path="/investments/overview" element={<InvestmentsOverview />} />
            <Route path="/investments/brokerage" element={<Brokerage />} />
            <Route path="/investments/retirement" element={<Retirement />} />
            <Route path="/investments/education" element={<Education />} />

            {/* Other */}
            <Route path="/goals" element={<Goals />} />
            <Route path="/recurrings" element={<Recurring />} /> {/* ✅ NEW ROUTE */}
          </Routes>
        </DashboardLayout>
      </div>
    </Router>
  );
}

export default App;

// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Overview from './pages/Overview';
import Dashboard from './pages/Budgeting/Dashboard';
import BudgetSpreadsheet from './pages/Budgeting/BudgetSpreadsheet';

function App() {
  return (
    <Router>
      <div className="flex bg-background min-h-screen">
        <Sidebar />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/budgeting" element={<Dashboard />} />
            <Route path="/budgeting/spreadsheet" element={<BudgetSpreadsheet />} />
          </Routes>
        </DashboardLayout>
      </div>
    </Router>
  );
}

// src/pages/Investments/Education.jsx
import AnimatedPage from '../../components/AnimatedPage';
import { Link } from 'react-router-dom';

export default function Education() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🎓 Education Savings</h1>

        {/* Subtab Navigation */}
        <nav className="mb-6 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link to="/investments/overview" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1">Overview</Link>
          <Link to="/investments/brokerage" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1">Brokerage</Link>
          <Link to="/investments/retirement" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1">Retirement</Link>
          <Link to="/investments/education" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Education</Link>
        </nav>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-300">
            This section will track education-related investments like 529 plans and custodial Roth IRAs for kids. You can include estimated education costs and track progress toward those goals.
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
}

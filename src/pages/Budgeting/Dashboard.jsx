return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🧾 Budgeting Dashboard</h1>
        <nav className="mb-8 flex justify-start gap-4 border-b border-gray-700 pb-3">
        {/* Title & Navigation */}
        <h1 className="text-3xl font-bold mb-6">📊 Budget Dashboard</h1>
        <nav className="mb-6 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link to="/budgeting" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Spreadsheet</Link>
        </nav>
        <BudgetDashboardCharts data={dummyData} />

        {/* Summary Card Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Income</p>
            <p className="text-2xl font-bold text-green-400">$5,000</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Expenses</p>
            <p className="text-2xl font-bold text-red-400">$4,200</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Savings</p>
            <p className="text-2xl font-bold text-sky-400">$800</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Net Difference</p>
            <p className="text-2xl font-bold text-green-500">+$800</p>
          </div>
        </div>

        {/* Charts from BudgetDashboardCharts */}
        <div className="mb-6">
          <BudgetDashboardCharts data={dummyData} />
        </div>

        {/* AI Suggestions Placeholder */}
        <div className="bg-gray-900 p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">🧠 Smart Suggestions</h2>
          <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
            <li>Consider reallocating $40 from Entertainment to Groceries based on your past 90-day trend.</li>
            <li>Your spending on Utilities is 8% lower than last month — nice job!</li>
            <li>You’re on track to exceed your savings goal if you maintain your current pace.</li>
          </ul>
        </div>

        {/* Category Highlights Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="text-white font-semibold text-lg mb-2">📈 Top Spending Categories</h3>
            <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
              <li>Housing: $1,430</li>
              <li>Food: $600</li>
              <li>Entertainment: $260</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="text-white font-semibold text-lg mb-2">📊 Category Breakdown</h3>
            <p className="text-sm text-gray-300">Food: 75% Groceries / 25% Fast Food</p>
            <p className="text-sm text-gray-300 mt-1">Lifestyle: 65% Entertainment / 35% Subscriptions</p>
          </div>Add commentMore actions
        </div>
      </div>
    </AnimatedPage>
  );

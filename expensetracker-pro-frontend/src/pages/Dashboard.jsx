import { useEffect, useState } from 'react';
import { Wallet, TrendingDown, PiggyBank, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllExpenses, getStats } from '../api/expenseApi';
import { getUserSummary } from '../api/userApi';
import StatCard from '../components/StatCard';
import CategoryDonutChart from '../components/CategoryDonutChart';
import TrendLineChart from '../components/TrendLineChart';
import BudgetProgress from '../components/BudgetProgress';
import RecentTransactions from '../components/RecentTransactions';
import { formatCurrency } from '../utils/format';

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-ink-100 dark:bg-white/5" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-72 rounded-2xl bg-ink-100 dark:bg-white/5" />
        <div className="h-72 rounded-2xl bg-ink-100 dark:bg-white/5" />
      </div>
    </div>
  );
}

function Dashboard() {
  const { currentUserId, currentUser } = useApp();
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) return;
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      const [expensesRes, statsRes, summaryRes] = await Promise.all([
        getAllExpenses({ userId: currentUserId }),
        getStats(currentUserId),
        getUserSummary(currentUserId),
      ]);
      if (cancelled) return;
      if (expensesRes.success) setExpenses(expensesRes.data);
      if (statsRes.success) setStats(statsRes.data);
      if (summaryRes.success) setSummary(summaryRes.data);
      setLoading(false);
    }

    loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [currentUserId]);

  if (loading || !stats || !summary) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          Welcome back, {currentUser?.name?.split(' ')[0]}
        </h1>
        <p className="mt-1 text-sm text-ink-400">Here's your financial overview for this month.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="Monthly Income"
          value={formatCurrency(currentUser.monthlyIncome)}
          accent="brand"
        />
        <StatCard
          icon={TrendingDown}
          label="Spent This Month"
          value={formatCurrency(summary.totalSpentThisMonth)}
          accent="negative"
        />
        <StatCard
          icon={PiggyBank}
          label="Savings"
          value={formatCurrency(summary.savings)}
          trend={summary.savingsRate}
          trendLabel="savings rate"
          accent="positive"
        />
        <StatCard
          icon={Target}
          label="Budget Remaining"
          value={formatCurrency(summary.budgetRemaining)}
          accent="brand"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-darkcard lg:col-span-3">
          <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
            Spending trend
          </h2>
          <p className="text-sm text-ink-400">Last 6 months</p>
          <div className="mt-2">
            <TrendLineChart byMonth={stats.byMonth} />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-darkcard lg:col-span-2">
          <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
            Budget progress
          </h2>
          <p className="text-sm text-ink-400">This month</p>
          <div className="mt-4">
            <BudgetProgress
              label="Overall budget"
              spent={summary.totalSpentThisMonth}
              total={currentUser.monthlyBudget}
              percent={summary.budgetUsedPercent}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-darkcard lg:col-span-3">
          <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
            By category
          </h2>
          <div className="mt-3">
            <CategoryDonutChart byCategory={stats.byCategory} />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-darkcard lg:col-span-2">
          <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
            Recent transactions
          </h2>
          <RecentTransactions expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

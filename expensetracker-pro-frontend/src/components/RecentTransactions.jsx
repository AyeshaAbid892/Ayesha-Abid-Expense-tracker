import { categoryColors, formatCurrency, formatDate } from '../utils/format';

function RecentTransactions({ expenses }) {
  const recent = [...expenses]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);

  if (recent.length === 0) {
    return <p className="py-6 text-center text-sm text-ink-400">No recent transactions.</p>;
  }

  return (
    <div className="divide-y divide-ink-50 dark:divide-white/5">
      {recent.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: categoryColors[expense.category]?.chart || '#9ca3af' }}
            />
            <div>
              <p className="text-sm font-medium text-ink-900 dark:text-white">{expense.title}</p>
              <p className="text-xs text-ink-400">{formatDate(expense.date)}</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-ink-900 dark:text-white">
            {formatCurrency(expense.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RecentTransactions;

import { formatCurrency } from '../utils/format';

function BudgetProgress({ label, spent, total, percent }) {
  const barColor = percent >= 90 ? 'bg-rose-500' : percent >= 70 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink-900 dark:text-white">{label}</span>
        <span className="text-ink-400">
          {formatCurrency(spent)} / {formatCurrency(total)}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${Math.min(100, percent)}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-ink-400">{percent}% of monthly budget used</p>
    </div>
  );
}

export default BudgetProgress;

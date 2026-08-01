function StatCard({ icon: Icon, label, value, trend, trendLabel, accent = 'brand' }) {
  const accentStyles = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
    positive: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    negative: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
  };

  return (
    <div className="animate-fade-in-up rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-surface-darkcard">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</p>
        {Icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accentStyles[accent]}`}>
            <Icon size={16} strokeWidth={2} />
          </div>
        )}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white">
        {value}
      </p>
      {trend !== undefined && (
        <p
          className={`mt-1 text-xs font-medium ${
            trend >= 0 ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {trend >= 0 ? '+' : ''}
          {trend}% {trendLabel}
        </p>
      )}
    </div>
  );
}

export default StatCard;

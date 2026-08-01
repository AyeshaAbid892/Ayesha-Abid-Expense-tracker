function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center dark:border-white/10 dark:bg-surface-darkcard">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/10">
          <Icon size={22} strokeWidth={1.75} />
        </div>
      )}
      <p className="font-display text-base font-semibold text-ink-900 dark:text-white">
        {title}
      </p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-ink-400">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;

const CATEGORY_OPTIONS = [
  { value: '', label: 'All categories' },
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
];

function FilterBar({ filters, onFilterChange }) {
  const handleChange = (key) => (event) => onFilterChange(key, event.target.value);

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
      <div className="min-w-[150px]">
        <label className="mb-1 block text-xs font-medium text-ink-400">Category</label>
        <select
          value={filters.category}
          onChange={handleChange('category')}
          className="w-full rounded-lg border border-ink-100 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-28">
        <label className="mb-1 block text-xs font-medium text-ink-400">Min PKR</label>
        <input
          type="number"
          min="0"
          value={filters.minAmount}
          onChange={handleChange('minAmount')}
          placeholder="0"
          className="w-full rounded-lg border border-ink-100 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div className="w-28">
        <label className="mb-1 block text-xs font-medium text-ink-400">Max PKR</label>
        <input
          type="number"
          min="0"
          value={filters.maxAmount}
          onChange={handleChange('maxAmount')}
          placeholder="Any"
          className="w-full rounded-lg border border-ink-100 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
    </div>
  );
}

export default FilterBar;

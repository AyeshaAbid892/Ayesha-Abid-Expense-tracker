import { useState } from 'react';
import { X } from 'lucide-react';

const CATEGORY_OPTIONS = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
];

const today = () => new Date().toISOString().split('T')[0];
const emptyForm = { title: '', amount: '', category: 'food', date: today(), description: '' };

function ExpenseModal({ open, onClose, onCreate }) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleChange = (field) => (event) => {
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.amount) {
      setError('Title and amount are required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onCreate({ ...formData, amount: Number(formData.amount) });
      setFormData({ ...emptyForm, date: today() });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="animate-fade-in-up w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-surface-darkcard">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            Add expense
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-400 hover:text-ink-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink-600 dark:text-ink-200">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleChange('title')}
              placeholder="e.g. Grocery shopping"
              className="w-full rounded-lg border border-ink-100 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-600 dark:text-ink-200">
                Amount (PKR)
              </label>
              <input
                type="number"
                min="1"
                value={formData.amount}
                onChange={handleChange('amount')}
                placeholder="0"
                className="w-full rounded-lg border border-ink-100 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-600 dark:text-ink-200">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={handleChange('date')}
                className="w-full rounded-lg border border-ink-100 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink-600 dark:text-ink-200">
              Category
            </label>
            <select
              value={formData.category}
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

          <div>
            <label className="mb-1 block text-sm font-medium text-ink-600 dark:text-ink-200">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={handleChange('description')}
              placeholder="Optional note"
              rows={2}
              className="w-full resize-none rounded-lg border border-ink-100 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {submitting ? 'Adding…' : 'Add Expense'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseModal;

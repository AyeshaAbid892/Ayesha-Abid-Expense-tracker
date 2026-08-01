import { useEffect, useState } from 'react';
import { Plus, Receipt } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllExpenses, createExpense, updateExpense, deleteExpense } from '../api/expenseApi';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseModal from '../components/ExpenseModal';
import EmptyState from '../components/EmptyState';

const initialFilters = { category: '', minAmount: '', maxAmount: '' };

function Expenses() {
  const { currentUserId, showToast } = useApp();
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchExpenses = async () => {
    if (!currentUserId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getAllExpenses({ ...filters, userId: currentUserId });
      if (response.success) {
        setExpenses(response.data);
      } else {
        setError(response.message || 'Failed to load expenses.');
      }
    } catch (err) {
      setError('Could not connect to the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentUserId]);

  const handleFilterChange = (key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
  };

  const handleCreate = async (formData) => {
    const response = await createExpense({ ...formData, userId: currentUserId });
    if (response.success) {
      showToast('Expense added successfully.', 'success');
      fetchExpenses();
    } else {
      showToast(response.message || 'Failed to add expense.', 'error');
    }
  };

  const handleUpdate = async (id, fields) => {
    const response = await updateExpense(id, fields);
    if (response.success) {
      showToast('Expense updated.', 'success');
      fetchExpenses();
    } else {
      showToast(response.message || 'Failed to update expense.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this expense? This cannot be undone.');
    if (!confirmed) return;
    const response = await deleteExpense(id);
    if (response.success) {
      showToast('Expense deleted.', 'success');
      fetchExpenses();
    } else {
      showToast(response.message || 'Failed to delete expense.', 'error');
    }
  };

  const visibleExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
            Expenses
          </h1>
          <p className="mt-1 text-sm text-ink-400">Track and manage every transaction.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title…"
            className="w-full rounded-lg border border-ink-100 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <div className="animate-pulse space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-ink-100 dark:bg-white/5" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-700">
          {error}
        </div>
      ) : visibleExpenses.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No expenses found"
          description="Add your first expense or adjust your filters to see results."
          action={
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Add Expense
            </button>
          }
        />
      ) : (
        <ExpenseTable expenses={visibleExpenses} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}

      <ExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </div>
  );
}

export default Expenses;

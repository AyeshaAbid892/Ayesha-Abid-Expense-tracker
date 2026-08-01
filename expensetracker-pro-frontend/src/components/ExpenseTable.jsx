import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { categoryColors, formatCurrency, formatDate } from '../utils/format';

function InlineEditableCell({ value, type = 'text', onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = () => {
    setEditing(false);
    if (draft !== value && draft !== '') {
      onSave(draft);
    } else {
      setDraft(value);
    }
  };

  if (editing) {
    return (
      <input
        autoFocus
        type={type}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') commit();
          if (event.key === 'Escape') {
            setDraft(value);
            setEditing(false);
          }
        }}
        className="w-full rounded-md border border-brand-500 bg-white px-2 py-1 text-sm outline-none dark:bg-surface-darkcard dark:text-white"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="group flex items-center gap-1.5 rounded-md px-1 py-0.5 text-left transition hover:bg-ink-50 dark:hover:bg-white/5"
      title="Click to edit"
    >
      <span>{type === 'number' ? formatCurrency(value) : value}</span>
      <Pencil size={12} className="text-ink-400 opacity-0 transition group-hover:opacity-100" />
    </button>
  );
}

function ExpenseTable({ expenses, onUpdate, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs font-medium uppercase tracking-wide text-ink-400 dark:border-white/10">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-b border-ink-50 transition last:border-0 hover:bg-ink-50/60 dark:border-white/5 dark:hover:bg-white/5"
              >
                <td className="px-5 py-3">
                  <InlineEditableCell
                    value={expense.title}
                    onSave={(newTitle) => onUpdate(expense.id, { title: newTitle })}
                  />
                  {expense.description && (
                    <p className="pl-1 text-xs text-ink-400">{expense.description}</p>
                  )}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      categoryColors[expense.category]?.badge || categoryColors.other.badge
                    }`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="px-5 py-3 text-ink-600 dark:text-ink-200">
                  {formatDate(expense.date)}
                </td>
                <td className="px-5 py-3 text-right font-medium text-ink-900 dark:text-white">
                  <InlineEditableCell
                    value={expense.amount}
                    type="number"
                    onSave={(newAmount) => onUpdate(expense.id, { amount: Number(newAmount) })}
                  />
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onDelete(expense.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;

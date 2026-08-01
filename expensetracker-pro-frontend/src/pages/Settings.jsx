import { Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/format';

function Settings() {
  const { currentUser, theme, toggleTheme } = useApp();

  if (!currentUser) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-ink-400">Manage your profile and preferences.</p>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
        <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
          Profile
        </h2>
        <div className="mt-4 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full font-display text-lg font-semibold text-white"
            style={{ backgroundColor: currentUser.avatarColor }}
          >
            {currentUser.initials}
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-ink-900 dark:text-white">
              {currentUser.name}
            </p>
            <p className="text-sm text-ink-400">{currentUser.email}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-100 pt-5 dark:border-white/10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
              Monthly income
            </p>
            <p className="mt-1 font-display text-base font-semibold text-ink-900 dark:text-white">
              {formatCurrency(currentUser.monthlyIncome)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
              Monthly budget
            </p>
            <p className="mt-1 font-display text-base font-semibold text-ink-900 dark:text-white">
              {formatCurrency(currentUser.monthlyBudget)}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-ink-400">
          This is a demo profile. Switch profiles anytime from the top-right menu.
        </p>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
        <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
          Appearance
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
            </div>
            <div>
              <p className="text-sm font-medium text-ink-900 dark:text-white">Dark mode</p>
              <p className="text-xs text-ink-400">Switch between light and dark themes.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className={`relative h-6 w-11 rounded-full transition ${
              theme === 'dark' ? 'bg-brand-500' : 'bg-ink-200'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;

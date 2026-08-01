import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, FileBarChart, Settings, Wallet, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/expenses', label: 'Expenses', icon: Receipt },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/settings', label: 'Settings', icon: Settings },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-ink-900 transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <Wallet size={17} className="text-white" strokeWidth={2.25} />
            </div>
            <span className="font-display text-base font-semibold text-white">Ledgerly</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-400 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-soft'
                    : 'text-ink-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} strokeWidth={1.9} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-5 left-0 w-full px-5">
          <div className="rounded-xl bg-white/5 p-3.5">
            <p className="text-xs font-medium text-ink-400">Ledgerly Pro</p>
            <p className="mt-0.5 text-xs text-ink-400/70">Demo multi-user workspace</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

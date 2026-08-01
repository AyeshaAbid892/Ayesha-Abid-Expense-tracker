import { useEffect, useRef, useState } from 'react';
import { Menu, Search, Bell, Moon, Sun, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getUserNotifications } from '../api/notificationApi';

function Avatar({ user, size = 32 }) {
  if (!user) return null;
  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-full font-display text-xs font-semibold text-white"
      style={{ width: size, height: size, backgroundColor: user.avatarColor }}
    >
      {user.initials}
    </div>
  );
}

function Topbar({ onMenuClick, searchTerm, onSearchChange }) {
  const { currentUser, users, currentUserId, setCurrentUserId, theme, toggleTheme } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    if (!currentUserId) return;
    getUserNotifications(currentUserId).then((response) => {
      if (response.success) setNotifications(response.data);
    });
  }, [currentUserId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(event.target)) setUserMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-100 bg-white/80 px-4 backdrop-blur-md dark:border-white/5 dark:bg-surface-dark/80 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <input
          type="text"
          value={searchTerm || ''}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Search transactions…"
          className="w-full rounded-lg border border-ink-100 bg-ink-50 py-2 pl-9 pr-3 text-sm text-ink-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:bg-white/10"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-white/5"
          title="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((open) => !open)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-white/5"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-negative" />
            )}
          </button>

          {notifOpen && (
            <div className="animate-fade-in-up absolute right-0 mt-2 w-80 rounded-xl border border-ink-100 bg-white p-2 shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
                Notifications
              </p>
              {notifications.length === 0 ? (
                <p className="px-2 py-4 text-center text-sm text-ink-400">You're all caught up.</p>
              ) : (
                <div className="max-h-72 space-y-1 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="rounded-lg px-2 py-2 transition hover:bg-ink-50 dark:hover:bg-white/5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-ink-900 dark:text-white">
                          {notif.title}
                        </p>
                        {!notif.read && <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />}
                      </div>
                      <p className="mt-0.5 text-xs text-ink-400">{notif.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={userRef}>
          <button
            type="button"
            onClick={() => setUserMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition hover:bg-ink-50 dark:hover:bg-white/5"
          >
            <Avatar user={currentUser} />
            <span className="hidden text-sm font-medium text-ink-900 dark:text-white sm:block">
              {currentUser?.name?.split(' ')[0] || 'Loading'}
            </span>
            <ChevronDown size={14} className="hidden text-ink-400 sm:block" />
          </button>

          {userMenuOpen && (
            <div className="animate-fade-in-up absolute right-0 mt-2 w-64 rounded-xl border border-ink-100 bg-white p-2 shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
                Switch profile
              </p>
              {users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    setCurrentUserId(user.id);
                    setUserMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition hover:bg-ink-50 dark:hover:bg-white/5"
                >
                  <Avatar user={user} size={28} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-ink-400">{user.email}</p>
                  </div>
                  {user.id === currentUserId && <Check size={15} className="text-brand-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;

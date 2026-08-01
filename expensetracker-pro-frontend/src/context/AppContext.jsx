import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getAllUsers } from '../api/userApi';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(
    () => localStorage.getItem('et-current-user') || 'demo-user-1'
  );
  const [theme, setTheme] = useState(() => localStorage.getItem('et-theme') || 'light');
  const [toasts, setToasts] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      setUsersLoading(true);
      try {
        const response = await getAllUsers();
        if (response.success) setUsers(response.data);
      } finally {
        setUsersLoading(false);
      }
    }
    loadUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem('et-current-user', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('et-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const showToast = useCallback((message, variant = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((previous) => [...previous, { id, message, variant }]);
    setTimeout(() => {
      setToasts((previous) => previous.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'light' ? 'dark' : 'light'));
  };

  const currentUser = users.find((user) => user.id === currentUserId) || null;

  const value = {
    users,
    usersLoading,
    currentUserId,
    setCurrentUserId,
    currentUser,
    theme,
    toggleTheme,
    toasts,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

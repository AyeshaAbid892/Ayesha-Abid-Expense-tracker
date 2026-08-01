import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const variantStyles = {
  success: { icon: CheckCircle2, ring: 'border-emerald-200', iconColor: 'text-emerald-500' },
  warning: { icon: AlertTriangle, ring: 'border-amber-200', iconColor: 'text-amber-500' },
  error: { icon: AlertTriangle, ring: 'border-rose-200', iconColor: 'text-rose-500' },
  info: { icon: Info, ring: 'border-blue-200', iconColor: 'text-blue-500' },
};

function ToastStack() {
  const { toasts, showToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
      {toasts.map((toast) => {
        const style = variantStyles[toast.variant] || variantStyles.info;
        const Icon = style.icon;
        return (
          <div
            key={toast.id}
            className={`animate-toast-in flex items-start gap-3 rounded-xl border ${style.ring} bg-white p-3 shadow-soft dark:bg-surface-darkcard dark:border-white/10`}
          >
            <Icon size={18} className={`mt-0.5 flex-shrink-0 ${style.iconColor}`} />
            <p className="flex-1 text-sm text-ink-800 dark:text-ink-100">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ToastStack;

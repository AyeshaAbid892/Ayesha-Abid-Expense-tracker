export const categoryColors = {
  food: { badge: 'bg-green-100 text-green-800', dot: '#16a34a', chart: '#22c55e' },
  transport: { badge: 'bg-blue-100 text-blue-800', dot: '#2563eb', chart: '#3b82f6' },
  shopping: { badge: 'bg-purple-100 text-purple-800', dot: '#9333ea', chart: '#a855f7' },
  utilities: { badge: 'bg-yellow-100 text-yellow-800', dot: '#ca8a04', chart: '#eab308' },
  health: { badge: 'bg-red-100 text-red-800', dot: '#dc2626', chart: '#ef4444' },
  other: { badge: 'bg-gray-100 text-gray-800', dot: '#6b7280', chart: '#9ca3af' },
};

export function formatCurrency(amount) {
  return `PKR ${Number(amount || 0).toLocaleString('en-PK')}`;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short' });
}

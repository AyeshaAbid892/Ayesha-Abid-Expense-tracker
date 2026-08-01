import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatCurrency, formatMonthLabel } from '../utils/format';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-ink-100 bg-white px-3 py-2 text-xs shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
      <p className="font-medium text-ink-900 dark:text-white">{formatMonthLabel(label)}</p>
      <p className="text-ink-400">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

function TrendLineChart({ byMonth }) {
  const data = Object.entries(byMonth || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }));

  if (data.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center text-sm text-ink-400">
        No trend data yet.
      </div>
    );
  }

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6d5ef9" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#6d5ef9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7ebef" />
          <XAxis
            dataKey="month"
            tickFormatter={formatMonthLabel}
            tick={{ fontSize: 12, fill: '#7c8a9a' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#7c8a9a' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${Math.round(value / 1000)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#6d5ef9"
            strokeWidth={2.5}
            fill="url(#trendFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendLineChart;

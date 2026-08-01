import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { categoryColors, formatCurrency } from '../utils/format';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-ink-100 bg-white px-3 py-2 text-xs shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
      <p className="font-medium capitalize text-ink-900 dark:text-white">{item.name}</p>
      <p className="text-ink-400">{formatCurrency(item.value)}</p>
    </div>
  );
}

function CategoryDonutChart({ byCategory }) {
  const data = Object.entries(byCategory || {}).map(([category, info]) => ({
    name: category,
    value: info.total,
  }));

  if (data.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center text-sm text-ink-400">
        No category data yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="h-56 w-56 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={categoryColors[entry.name]?.chart || '#9ca3af'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1 space-y-2">
        {data
          .sort((a, b) => b.value - a.value)
          .map((entry) => (
            <div key={entry.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: categoryColors[entry.name]?.chart || '#9ca3af' }}
                />
                <span className="capitalize text-ink-600 dark:text-ink-200">{entry.name}</span>
              </div>
              <span className="font-medium text-ink-900 dark:text-white">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CategoryDonutChart;

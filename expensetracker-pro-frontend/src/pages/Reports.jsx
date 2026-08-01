import { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import { useApp } from '../context/AppContext';
import { getAllExpenses, getStats, getExportCsvUrl } from '../api/expenseApi';
import { formatCurrency, formatDate } from '../utils/format';

function Reports() {
  const { currentUser, currentUserId, showToast } = useApp();
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) return;
    setLoading(true);
    Promise.all([getAllExpenses({ userId: currentUserId }), getStats(currentUserId)]).then(
      ([expensesRes, statsRes]) => {
        if (expensesRes.success) setExpenses(expensesRes.data);
        if (statsRes.success) setStats(statsRes.data);
        setLoading(false);
      }
    );
  }, [currentUserId]);

  const handleCsvExport = () => {
    window.open(getExportCsvUrl(currentUserId), '_blank');
    showToast('CSV export started.', 'success');
  };

  const handlePdfExport = () => {
    const doc = new jsPDF();
    const marginX = 14;
    let y = 18;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Ledgerly — Expense Report', marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    y += 8;
    doc.text(`Prepared for: ${currentUser?.name || ''}`, marginX, y);
    y += 5;
    doc.text(`Generated: ${new Date().toLocaleDateString('en-US')}`, marginX, y);
    y += 5;
    doc.text(`Total spent: ${formatCurrency(stats?.totalAmount || 0)}`, marginX, y);

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Title', marginX, y);
    doc.text('Category', marginX + 70, y);
    doc.text('Date', marginX + 115, y);
    doc.text('Amount', marginX + 155, y);
    y += 3;
    doc.line(marginX, y, 196, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    expenses.slice(0, 40).forEach((expense) => {
      if (y > 280) {
        doc.addPage();
        y = 18;
      }
      doc.text(expense.title.slice(0, 32), marginX, y);
      doc.text(expense.category, marginX + 70, y);
      doc.text(expense.date, marginX + 115, y);
      doc.text(formatCurrency(expense.amount), marginX + 155, y);
      y += 6;
    });

    doc.save(`ledgerly-report-${currentUserId}.pdf`);
    showToast('PDF report downloaded.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          Reports
        </h1>
        <p className="mt-1 text-sm text-ink-400">Export your expense history for record-keeping.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <FileText size={18} />
          </div>
          <h2 className="mt-3 font-display text-base font-semibold text-ink-900 dark:text-white">
            PDF Report
          </h2>
          <p className="mt-1 text-sm text-ink-400">
            A formatted summary with your total spend and full transaction list.
          </p>
          <button
            type="button"
            onClick={handlePdfExport}
            disabled={loading}
            className="mt-4 flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            <Download size={15} />
            Download PDF
          </button>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <FileText size={18} />
          </div>
          <h2 className="mt-3 font-display text-base font-semibold text-ink-900 dark:text-white">
            CSV Export
          </h2>
          <p className="mt-1 text-sm text-ink-400">
            Raw transaction data, ready to import into a spreadsheet.
          </p>
          <button
            type="button"
            onClick={handleCsvExport}
            className="mt-4 flex items-center gap-2 rounded-lg border border-ink-100 px-4 py-2 text-sm font-semibold text-ink-900 transition hover:bg-ink-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
          >
            <Download size={15} />
            Download CSV
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-darkcard">
        <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
          Summary
        </h2>
        {loading || !stats ? (
          <p className="mt-3 text-sm text-ink-400">Loading…</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-ink-400">Transactions</p>
              <p className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                {stats.totalExpenses}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-400">Total spent</p>
              <p className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                {formatCurrency(stats.totalAmount)}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-400">Highest expense</p>
              <p className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                {stats.highestExpense ? formatCurrency(stats.highestExpense.amount) : '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-400">Lowest expense</p>
              <p className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                {stats.lowestExpense ? formatCurrency(stats.lowestExpense.amount) : '—'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;

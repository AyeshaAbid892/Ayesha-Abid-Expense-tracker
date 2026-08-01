const { readExpenses, writeExpenses } = require('../utils/fileHelper');

const VALID_CATEGORIES = ['food', 'transport', 'shopping', 'utilities', 'health', 'other'];

/**
 * GET /api/expenses
 * Returns all expenses, optionally filtered by category, search text,
 * minAmount, and maxAmount. Filters can be combined.
 */
function getAllExpenses(req, res) {
  const { category, search, minAmount, maxAmount, userId } = req.query;
  let expenses = readExpenses();

  if (userId) {
    expenses = expenses.filter((expense) => String(expense.userId) === String(userId));
  }

  if (category) {
    expenses = expenses.filter((expense) => expense.category === category);
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    expenses = expenses.filter((expense) =>
      expense.title.toLowerCase().includes(searchTerm)
    );
  }

  if (minAmount) {
    expenses = expenses.filter((expense) => expense.amount >= Number(minAmount));
  }

  if (maxAmount) {
    expenses = expenses.filter((expense) => expense.amount <= Number(maxAmount));
  }

  res.json({ success: true, count: expenses.length, data: expenses });
}

/**
 * GET /api/expenses/stats
 * Must be registered before /:id in the router, otherwise "stats"
 * would be parsed as an id.
 */
function getExpenseStats(req, res) {
  const { userId } = req.query;
  let expenses = readExpenses();
  if (userId) {
    expenses = expenses.filter((expense) => String(expense.userId) === String(userId));
  }

  const totalExpenses = expenses.length;
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const byCategory = {};
  expenses.forEach((expense) => {
    if (!byCategory[expense.category]) {
      byCategory[expense.category] = { count: 0, total: 0 };
    }
    byCategory[expense.category].count += 1;
    byCategory[expense.category].total += expense.amount;
  });

  let highestExpense = null;
  let lowestExpense = null;

  expenses.forEach((expense) => {
    if (!highestExpense || expense.amount > highestExpense.amount) {
      highestExpense = { title: expense.title, amount: expense.amount };
    }
    if (!lowestExpense || expense.amount < lowestExpense.amount) {
      lowestExpense = { title: expense.title, amount: expense.amount };
    }
  });

  const byMonth = {};
  expenses.forEach((expense) => {
    const monthKey = (expense.date || '').slice(0, 7); // YYYY-MM
    if (!monthKey) return;
    if (!byMonth[monthKey]) byMonth[monthKey] = 0;
    byMonth[monthKey] += expense.amount;
  });

  res.json({
    success: true,
    data: {
      totalExpenses,
      totalAmount,
      byCategory,
      byMonth,
      highestExpense,
      lowestExpense,
    },
  });
}

/**
 * GET /api/expenses/:id
 */
function getExpenseById(req, res) {
  const expenseId = parseInt(req.params.id, 10);
  const expenses = readExpenses();
  const expense = expenses.find((item) => item.id === expenseId);

  if (!expense) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }

  res.json({ success: true, data: expense });
}

/**
 * POST /api/expenses
 * Required fields (title, amount, category) are checked by the
 * validate middleware before this controller runs.
 */
function createExpense(req, res) {
  const { title, amount, category, description, date, userId } = req.body;

  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({
      success: false,
      message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
    });
  }

  const expenses = readExpenses();

  const newExpense = {
    id: Date.now(),
    userId: userId || 'demo-user-1',
    title,
    amount: Number(amount),
    category,
    date: date || new Date().toISOString().split('T')[0],
    description: description || '',
    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);
  writeExpenses(expenses);

  res.status(201).json({ success: true, data: newExpense });
}

/**
 * PUT /api/expenses/:id
 * Partial update - only fields present in req.body are changed.
 * id and createdAt can never be overwritten.
 */
function updateExpense(req, res) {
  const expenseId = parseInt(req.params.id, 10);
  const expenses = readExpenses();
  const expenseIndex = expenses.findIndex((item) => item.id === expenseId);

  if (expenseIndex === -1) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }

  const { id, createdAt, ...updateFields } = req.body;

  const updatedExpense = {
    ...expenses[expenseIndex],
    ...updateFields,
  };

  expenses[expenseIndex] = updatedExpense;
  writeExpenses(expenses);

  res.json({ success: true, data: updatedExpense });
}

/**
 * DELETE /api/expenses/:id
 */
function deleteExpense(req, res) {
  const expenseId = parseInt(req.params.id, 10);
  const expenses = readExpenses();
  const expenseIndex = expenses.findIndex((item) => item.id === expenseId);

  if (expenseIndex === -1) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }

  expenses.splice(expenseIndex, 1);
  writeExpenses(expenses);

  res.json({ success: true, message: 'Expense deleted successfully' });
}

/**
 * GET /api/expenses/export
 * Bonus feature: returns a downloadable CSV built with plain string
 * concatenation - no external CSV library, only fs-backed data.
 */
function exportExpensesCsv(req, res) {
  const { userId } = req.query;
  let expenses = readExpenses();
  if (userId) {
    expenses = expenses.filter((expense) => String(expense.userId) === String(userId));
  }

  const header = 'id,title,amount,category,date,description,createdAt';
  const rows = expenses.map((expense) => {
    const safeDescription = (expense.description || '').replace(/"/g, '""');
    return [
      expense.id,
      `"${expense.title.replace(/"/g, '""')}"`,
      expense.amount,
      expense.category,
      expense.date,
      `"${safeDescription}"`,
      expense.createdAt,
    ].join(',');
  });

  const csvContent = [header, ...rows].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"');
  res.send(csvContent);
}

module.exports = {
  getAllExpenses,
  getExpenseStats,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  exportExpensesCsv,
};

const { readUsers } = require('../utils/userHelper');
const { readExpenses } = require('../utils/fileHelper');

function getAllUsers(req, res) {
  const users = readUsers();
  res.json({ success: true, count: users.length, data: users });
}

function getUserById(req, res) {
  const users = readUsers();
  const user = users.find((item) => item.id === req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({ success: true, data: user });
}

/**
 * GET /api/users/:id/summary
 * Personalized financial summary for a single user - income, spend,
 * budget remaining, and savings rate for the current month.
 */
function getUserSummary(req, res) {
  const users = readUsers();
  const user = users.find((item) => item.id === req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const expenses = readExpenses().filter((expense) => expense.userId === user.id);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthExpenses = expenses.filter((expense) => (expense.date || '').startsWith(currentMonth));

  const totalSpentThisMonth = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetRemaining = user.monthlyBudget - totalSpentThisMonth;
  const budgetUsedPercent = user.monthlyBudget
    ? Math.min(100, Math.round((totalSpentThisMonth / user.monthlyBudget) * 100))
    : 0;
  const savings = user.monthlyIncome - totalSpentThisMonth;
  const savingsRate = user.monthlyIncome
    ? Math.round((savings / user.monthlyIncome) * 100)
    : 0;

  res.json({
    success: true,
    data: {
      user,
      totalSpentThisMonth,
      budgetRemaining,
      budgetUsedPercent,
      savings,
      savingsRate,
    },
  });
}

module.exports = { getAllUsers, getUserById, getUserSummary };

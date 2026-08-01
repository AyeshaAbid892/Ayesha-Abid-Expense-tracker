const express = require('express');
const router = express.Router();

const validate = require('../middleware/validate');
const {
  getAllExpenses,
  getExpenseStats,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  exportExpensesCsv,
} = require('../controllers/expenseController');

// IMPORTANT: /stats and /export must be defined before /:id, otherwise
// they would be captured as the :id parameter and never reached.
router.get('/stats', getExpenseStats);
router.get('/export', exportExpensesCsv);

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/', validate('title', 'amount', 'category'), createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;

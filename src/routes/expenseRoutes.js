const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const expenseController = require('../controllers/expenseController');

// Define routes
router.post('/', protect, expenseController.createExpense);
router.get('/', protect, expenseController.getAllExpenses);
router.get('/:id', protect, expenseController.getExpenseById);
router.put('/:id', protect, expenseController.updateExpense);
router.delete('/:id', protect, expenseController.deleteExpense);

module.exports = router;

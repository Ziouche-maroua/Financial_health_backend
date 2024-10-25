const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const incomeController = require('../controllers/incomeController');

// Define routes
router.post('/', protect, incomeController.createIncome);
router.get('/', protect, incomeController.getAllIncomes);
router.get('/:id', protect, incomeController.getIncomeById);
router.put('/:id', protect, incomeController.updateIncome);
router.delete('/:id', protect, incomeController.deleteIncome);

module.exports = router;

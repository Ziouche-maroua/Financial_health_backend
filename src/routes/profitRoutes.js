const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const profitController = require('../controllers/profitController');

// Define routes
router.post('/', protect, profitController.createProfit);
router.get('/', protect, profitController.getAllProfits);
router.get('/:id', protect, profitController.getProfitById);
router.put('/:id', protect, profitController.updateProfit);
router.delete('/:id', protect, profitController.deleteProfit);

module.exports = router;

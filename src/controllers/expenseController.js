const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Expense
async function createExpense(req, res) {
  const { date, amount, expense_category, description } = req.body;

  try {
    const expense = await prisma.expense.create({
      data: {
        date,
        amount,
        expense_category,
        description,
        userId: req.user.id // Link to authenticated user
      }
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the expense' });
  }
}

// Get All Expenses for Authenticated User
async function getAllExpenses(req, res) {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user.id }
    });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching expenses' });
  }
}

// Get Expense by ID
async function getExpenseById(req, res) {
  const id = parseInt(req.params.id);

  try {
    const expense = await prisma.expense.findUnique({
      where: { id, userId: req.user.id } // Ensure expense belongs to user
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the expense' });
  }
}

// Update Expense
async function updateExpense(req, res) {
  const id = parseInt(req.params.id);
  const { date, amount, expense_category, description } = req.body;

  try {
    const expense = await prisma.expense.update({
      where: { id, userId: req.user.id }, // Ensure expense belongs to user
      data: { date, amount, expense_category, description }
    });
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the expense' });
  }
}

// Delete Expense
async function deleteExpense(req, res) {
  const id = parseInt(req.params.id);

  try {
    await prisma.expense.delete({
      where: { id, userId: req.user.id } // Ensure expense belongs to user
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the expense' });
  }
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
};

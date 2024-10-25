const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Income
async function createIncome(req, res) {
  const { date, amount, product_line, description } = req.body;

  try {
    const income = await prisma.income.create({
      data: {
        date,
        amount,
        product_line,
        description,
        userId: req.user.id // Link to authenticated user
      }
    });
    res.status(201).json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the income' });
  }
}

// Get All Incomes for Authenticated User
async function getAllIncomes(req, res) {
  try {
    const incomes = await prisma.income.findMany({
      where: { userId: req.user.id }
    });
    res.json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching incomes' });
  }
}

// Get Income by ID
async function getIncomeById(req, res) {
  const id = parseInt(req.params.id);

  try {
    const income = await prisma.income.findUnique({
      where: { id, userId: req.user.id } // Ensure income belongs to user
    });

    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }

    res.json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the income' });
  }
}

// Update Income
async function updateIncome(req, res) {
  const id = parseInt(req.params.id);
  const { date, amount, product_line, description } = req.body;

  try {
    const income = await prisma.income.update({
      where: { id, userId: req.user.id }, // Ensure income belongs to user
      data: { date, amount, product_line, description }
    });
    res.json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the income' });
  }
}

// Delete Income
async function deleteIncome(req, res) {
  const id = parseInt(req.params.id);

  try {
    await prisma.income.delete({
      where: { id, userId: req.user.id } // Ensure income belongs to user
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the income' });
  }
}

module.exports = {
  createIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome
};

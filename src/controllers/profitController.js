const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Profit
async function createProfit(req, res) {
  const { date, revenue, expenses, net_profit, profit_margin, description } = req.body;

  try {
    const profit = await prisma.profit.create({
      data: {
        date,
        revenue,
        expenses,
        net_profit,
        profit_margin,
        description,
        userId: req.user.id // Link to authenticated user
      }
    });
    res.status(201).json(profit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the profit' });
  }
}

// Get All Profits for Authenticated User
async function getAllProfits(req, res) {
  try {
    const profits = await prisma.profit.findMany({
      where: { userId: req.user.id }
    });
    res.json(profits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching profits' });
  }
}

// Get Profit by ID
async function getProfitById(req, res) {
  const id = parseInt(req.params.id);

  try {
    const profit = await prisma.profit.findUnique({
      where: { id, userId: req.user.id } // Ensure profit belongs to user
    });

    if (!profit) {
      return res.status(404).json({ error: 'Profit not found' });
    }

    res.json(profit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the profit' });
  }
}

// Update Profit
async function updateProfit(req, res) {
  const id = parseInt(req.params.id);
  const { date, revenue, expenses, net_profit, profit_margin, description } = req.body;

  try {
    const profit = await prisma.profit.update({
      where: { id, userId: req.user.id }, // Ensure profit belongs to user
      data: { date, revenue, expenses, net_profit, profit_margin, description }
    });
    res.json(profit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the profit' });
  }
}

// Delete Profit
async function deleteProfit(req, res) {
  const id = parseInt(req.params.id);

  try {
    await prisma.profit.delete({
      where: { id, userId: req.user.id } // Ensure profit belongs to user
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the profit' });
  }
}

module.exports = {
  createProfit,
  getAllProfits,
  getProfitById,
  updateProfit,
  deleteProfit
};

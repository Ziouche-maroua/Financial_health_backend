// reportController.js
const { PrismaClient } = require('@prisma/client');
const PDFDocument = require('pdfkit');

const prisma = new PrismaClient();

// Fetch expenses from the database with error handling
const fetchUserExpenses = async (userId, startDate, endDate) => {
    try {
        return await prisma.expense.findMany({
            where: {
                userId: parseInt(userId), // Ensure userId is an integer
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw new Error('Failed to fetch expenses.');
    }
};

// Fetch income from the database with error handling
const fetchUserIncome = async (userId, startDate, endDate) => {
    try {
        return await prisma.income.findMany({
            where: {
                userId: parseInt(userId), // Ensure userId is an integer
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        });
    } catch (error) {
        console.error('Error fetching income:', error);
        throw new Error('Failed to fetch income.');
    }
};

// Fetch profits from the database with error handling
const fetchUserProfits = async (userId, startDate, endDate) => {
    try {
        return await prisma.profit.findMany({
            where: {
                userId: parseInt(userId), // Ensure userId is an integer
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        });
    } catch (error) {
        console.error('Error fetching profits:', error);
        throw new Error('Failed to fetch profits.');
    }
};

// Generate PDF report with error handling
const generatePDFReport = async (req, res) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    try {
        // Fetch data from each table
        const expenses = await fetchUserExpenses(userId, startDate, endDate);
        const income = await fetchUserIncome(userId, startDate, endDate);
        const profits = await fetchUserProfits(userId, startDate, endDate);

        // Check if there are any transactions at all
        if (!expenses.length && !income.length && !profits.length) {
            return res.status(404).json({ message: 'No transactions found for the specified period.' });
        }

        // Initialize PDF document
        const doc = new PDFDocument();
        const filename = `financial-report-${userId}.pdf`;

        // Set response headers for file download
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Content-Type", "application/pdf");

        // Pipe PDF content to the response
        doc.pipe(res);

        // Add report header
        doc.fontSize(20).text('Financial Report', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`User ID: ${userId}`);
        doc.text(`Report Period: ${startDate} to ${endDate}`);
        doc.moveDown();

        // Add each section to the PDF
        if (expenses.length) {
            doc.text('Expenses:', { underline: true });
            expenses.forEach(expense => {
                doc.moveDown();
                doc.text(`Date: ${expense.date.toISOString().split('T')[0]}`);
                doc.text(`Amount: $${expense.amount.toFixed(2)}`);
                doc.text(`Category: ${expense.expense_category}`);
                doc.text(`Description: ${expense.description || 'N/A'}`);
            });
            doc.moveDown();
        }

        if (income.length) {
            doc.text('Income:', { underline: true });
            income.forEach(inc => {
                doc.moveDown();
                doc.text(`Date: ${inc.date.toISOString().split('T')[0]}`);
                doc.text(`Amount: $${inc.amount.toFixed(2)}`);
                doc.text(`Category: ${inc.income_category}`);
                doc.text(`Description: ${inc.description || 'N/A'}`);
            });
            doc.moveDown();
        }

        if (profits.length) {
            doc.text('Profits:', { underline: true });
            profits.forEach(profit => {
                doc.moveDown();
                doc.text(`Date: ${profit.date.toISOString().split('T')[0]}`);
                doc.text(`Amount: $${profit.amount.toFixed(2)}`);
                doc.text(`Category: ${profit.profit_category}`);
                doc.text(`Description: ${profit.description || 'N/A'}`);
            });
        }

        // Finalize the PDF document
        doc.end();
    } catch (error) {
        console.error('Error generating PDF report:', error);
        res.status(500).json({ message: 'An error occurred while generating the PDF report.' });
    }
};

// Export the generatePDFReport function
module.exports = {
    generatePDFReport,
};

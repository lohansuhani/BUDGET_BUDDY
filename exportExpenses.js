const fs = require('fs');
const mongoose = require('mongoose');
const Expense = require('./backend/models/expense');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Fetch expenses and export to CSV
async function exportExpenses() {
    try {
        const expenses = await Expense.find().sort({ date: 1 });
        const csvData = expenses.map(exp => {
            const date = new Date(exp.date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
            return `${date},${exp.amount},${exp.category}`;
        }).join('\n');
        fs.writeFileSync('ai/expenses.csv', 'date,amount,category\n' + csvData);
        console.log('Expenses exported to ai/expenses.csv');
    } catch (error) {
        console.error('Error exporting expenses:', error);
    }
}

module.exports = exportExpenses;
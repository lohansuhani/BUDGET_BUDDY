const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
    const { amount, category, paymentMethod } = req.body;
    try {
        const expense = new Expense({ amount, category, paymentMethod });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense', error });
    }
};
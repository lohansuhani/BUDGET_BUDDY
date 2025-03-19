require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));
connectDB();
app.use('/api/expenses', expenseRoutes);
app.get('/', async (req, res) => {
    const expenses = await require('./models/expense').find().sort({ date: -1 });
    res.render('layout', { body: 'index', expenses });
});
app.get('/add-expense', (req, res) => {
    res.render('layout', { body: 'add-expense' });
});
app.get('/sample', (req, res) => {
    res.render('layout');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    receiptPath: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);

import mongoose from 'mongoose';

// Example Expense Schema
const expenseSchema = new mongoose.Schema({
    date: Date,
    label: String,
    description: String,
    price: Number
}, {
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense
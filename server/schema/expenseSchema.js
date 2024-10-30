"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Example Expense Schema
const expenseSchema = new mongoose_1.default.Schema({
    date: Date,
    label: String,
    description: String,
    price: Number
}, {
    timestamps: true
});
const Expense = mongoose_1.default.model('Expense', expenseSchema);
exports.default = Expense;

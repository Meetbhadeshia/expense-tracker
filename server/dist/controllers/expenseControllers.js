"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnExpense = exports.editAnExpense = exports.readAllExpenses = exports.createExpense = void 0;
const expenseSchema_1 = __importDefault(require("../schema/expenseSchema"));
const date_fns_1 = require("date-fns"); // date-fns for date handling
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, description, label, price } = req.body;
    try {
        const expense = yield expenseSchema_1.default.create({ date, description, label, price });
        res.status(201).json(expense);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
});
exports.createExpense = createExpense;
const readAllExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date1, date2, label } = req.query;
        let filter = {};
        if (date1 && date2 && label) {
            // Parse and filter expenses between date1 and date2
            filter = {
                date: {
                    $gte: new Date(date1), // Automatically interprets 'YYYY-MM-DD' format
                    $lte: new Date(date2),
                },
                label: {
                    $eq: label
                }
            };
        }
        else if (date1 && date2) {
            filter = {
                date: {
                    $gte: new Date(date1), // Automatically interprets 'YYYY-MM-DD' format
                    $lte: new Date(date2),
                },
            };
        }
        else if (label) {
            filter = {
                label: {
                    $eq: label
                }
            };
        }
        else {
            // Default to the current month if date1 and date2 are not provided
            const startOfCurrentMonth = (0, date_fns_1.startOfMonth)(new Date());
            const endOfCurrentMonth = (0, date_fns_1.endOfMonth)(new Date());
            filter = {
                date: {
                    $gte: startOfCurrentMonth,
                    $lte: endOfCurrentMonth,
                },
            };
        }
        const expenses = yield expenseSchema_1.default.find(filter).sort({ date: 1 }); // Sort by date field in ascending order
        res.status(200).json(expenses);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
});
exports.readAllExpenses = readAllExpenses;
const editAnExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, date, label, description, price } = req.body;
    try {
        const updatedExpense = yield expenseSchema_1.default.findOneAndUpdate({ _id: id }, // Use _id to query the document
        { date, description, label, price });
        res.status(201).json(updatedExpense);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
});
exports.editAnExpense = editAnExpense;
const deleteAnExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deletedExpense = yield expenseSchema_1.default.findOneAndDelete({ _id: id });
        res.status(201).json(deletedExpense);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
});
exports.deleteAnExpense = deleteAnExpense;

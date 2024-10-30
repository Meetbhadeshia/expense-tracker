import { Request, Response } from 'express';
import Expense from "../schema/expenseSchema"
import { startOfMonth, endOfMonth } from 'date-fns'; // date-fns for date handling

export const createExpense = async (req: Request, res: Response): Promise<void> => {
    const { date, description, label, price } = req.body;

    try {
        const expense = await Expense.create({ date, description, label, price });
        res.status(201).json(expense);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
};

export const readAllExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { date1, date2 } = req.query;
        let filter = {};
        if (date1 && date2) {
            // Parse and filter expenses between date1 and date2
            filter = {
                date: {
                    $gte: new Date(date1 as string), // Automatically interprets 'YYYY-MM-DD' format
                    $lte: new Date(date2 as string),
                },
            };
        } else {
            // Default to the current month if date1 and date2 are not provided
            const startOfCurrentMonth = startOfMonth(new Date());
            const endOfCurrentMonth = endOfMonth(new Date());

            filter = {
                date: {
                    $gte: startOfCurrentMonth,
                    $lte: endOfCurrentMonth,
                },
            };
        }
        const expenses = await Expense.find(filter).sort({ date: 1 }); // Sort by date field in ascending order
        res.status(200).json(expenses);

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
};


export const editAnExpense = async (req: Request, res: Response): Promise<void> => {
    const { id, date, label, description, price } = req.body;
    try {
        const updatedExpense = await Expense.findOneAndUpdate({ _id: id }, // Use _id to query the document
            { date, description, label, price })
        res.status(201).json(updatedExpense);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
};

export const deleteAnExpense = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    try {
        const deletedExpense = await Expense.findOneAndDelete({ _id: id })
        res.status(201).json(deletedExpense);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
};
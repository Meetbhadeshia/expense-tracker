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
        const { date1, date2, label, home } = req.query;
        let filter = {};
        if (date1 && date2 && label) {
            // Parse and filter expenses between date1 and date2
            filter = {
                date: {
                    $gte: new Date(date1 as string), // Automatically interprets 'YYYY-MM-DD' format
                    $lte: new Date(date2 as string),
                },
                label: {
                    $eq: label
                }
            };
        } else if (date1 && date2) {
            filter = {
                date: {
                    $gte: new Date(date1 as string), // Automatically interprets 'YYYY-MM-DD' format
                    $lte: new Date(date2 as string),
                },
            };
        } else if (label) {
            filter = {
                label: {
                    $eq: label
                }
            };
        }
        else if (home) {
            // Default to the current month if date1 and date2 are not provided
            const startOfCurrentMonth = startOfMonth(new Date());
            const endOfCurrentMonth = endOfMonth(new Date());
            filter = {
                date: {
                    $gte: startOfCurrentMonth,
                    $lte: endOfCurrentMonth,
                },
            };
            const expenses = await Expense.find(filter).sort({ date: 1 }); // Sort by date field in ascending order
            // console.log("expenese", expenses)
            //     1. create var labelsHash
            //     2. loop through data
            //     a.if new label => initiate 1 in labelsHash
            //     b.else => addLabels with 1
            //     3. loop through hashMap 
            //     a. get keys and values seperate in diff arrays
            let labelsHash: { [key: string]: number } = {}; // Initialize the hash map
            let labels: Array<string> = []
            let values: Array<number> = []
            for (let i = 0; i < expenses.length; i++) {
                let expense: any = expenses[i]
                let label: string = expense.label
                let price: number = expense.price
                if (!(label in labelsHash)) {
                    labelsHash[label] = price;
                } else {
                    labelsHash[label] += price;
                }
            }
            // console.log("label map", labelsHash)
            Object.entries(labelsHash).forEach(([key, value]) => {
                labels.push(key)
                values.push(value)
            });
            // console.log("labels", labels)
            // console.log("values", values)
            res.status(200).json({ labels, values });
            return;
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
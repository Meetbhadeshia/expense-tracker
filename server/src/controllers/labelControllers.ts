import { Request, Response } from 'express';
import Label from "../schema/labelSchema"
import { startOfMonth, endOfMonth } from 'date-fns'; // date-fns for date handling

export const createLabel = async (req: Request, res: Response): Promise<void> => {
    const { label } = req.body;

    try {
        const name = await Label.create({ label });
        res.status(201).json(name);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }

    

};

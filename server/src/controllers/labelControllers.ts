import { Request, Response } from 'express';
import Label from "../schema/labelSchema"

export const createLabel = async (req: Request, res: Response): Promise<void> => {
    const { label } = req.body;
    const userId = (req as any).user?.userId;

    try {
        const name = await Label.create({ label, userId });
        res.status(201).json(name);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }

};

export const getLabelsAccordingToAUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.userId;

        // Find labels for the given userId
        const labels = await Label.find({ userId });

        // Check if labels exist
        if (!labels.length) {
            res.status(404).json({ message: 'No labels found' });
        }

        res.status(200).json(labels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const editLabel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { label } = req.body;

        // Validate ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid label ID format' });
        }

        const userId = (req as any).user?.userId;

        // Find and update the label
        const updatedLabel = await Label.findOneAndUpdate(
            { _id: id, userId },
            { label }, // Update only the label field
            { new: true, runValidators: true } // Return updated document & validate changes
        );

        // If no label is found, return a 404 response
        if (!updatedLabel) {
            res.status(404).json({ message: 'Label not found' });
        }

        res.status(200).json({ message: 'Label updated successfully', label: updatedLabel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteLabel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid label ID format' });
        }

        const userId = (req as any).user?.userId;

        // Find and delete the label
        const deletedLabel = await Label.findOneAndDelete({ _id: id, userId });

        // If label is not found, return a 404 response
        if (!deletedLabel) {
            res.status(404).json({ message: 'Label not found' });
        }

        res.status(200).json({ message: 'Label deleted successfully', label: deletedLabel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
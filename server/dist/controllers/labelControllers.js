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
exports.deleteLabel = exports.editLabel = exports.getLabelsAccordingToAUser = exports.createLabel = void 0;
const labelSchema_1 = __importDefault(require("../schema/labelSchema"));
const createLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { label, userId } = req.body;
    try {
        const name = yield labelSchema_1.default.create({ label, userId });
        res.status(201).json(name);
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
exports.createLabel = createLabel;
const getLabelsAccordingToAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Validate ObjectId format
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid userId format' });
        }
        // Find labels for the given userId
        const labels = yield labelSchema_1.default.find({ userId });
        // Check if labels exist
        if (!labels.length) {
            res.status(404).json({ message: 'No labels found' });
        }
        res.status(200).json(labels);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getLabelsAccordingToAUser = getLabelsAccordingToAUser;
const editLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { label } = req.body;
        // Validate ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid label ID format' });
        }
        // Find and update the label
        const updatedLabel = yield labelSchema_1.default.findByIdAndUpdate(id, { label }, // Update only the label field
        { new: true, runValidators: true } // Return updated document & validate changes
        );
        // If no label is found, return a 404 response
        if (!updatedLabel) {
            res.status(404).json({ message: 'Label not found' });
        }
        res.status(200).json({ message: 'Label updated successfully', label: updatedLabel });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.editLabel = editLabel;
const deleteLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validate ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid label ID format' });
        }
        // Find and delete the label
        const deletedLabel = yield labelSchema_1.default.findByIdAndDelete(id);
        // If label is not found, return a 404 response
        if (!deletedLabel) {
            res.status(404).json({ message: 'Label not found' });
        }
        res.status(200).json({ message: 'Label deleted successfully', label: deletedLabel });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteLabel = deleteLabel;

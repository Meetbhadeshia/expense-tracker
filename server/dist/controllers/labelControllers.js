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
    var _a;
    const { label } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
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
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
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
    var _a;
    try {
        const { id } = req.params;
        const { label } = req.body;
        // Validate ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid label ID format' });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        // Find and update the label
        const updatedLabel = yield labelSchema_1.default.findOneAndUpdate({ _id: id, userId }, { label }, // Update only the label field
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
    var _a;
    try {
        const { id } = req.params;
        // Validate ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid label ID format' });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        // Find and delete the label
        const deletedLabel = yield labelSchema_1.default.findOneAndDelete({ _id: id, userId });
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Example label Schema
const labelSchema = new mongoose_1.default.Schema({
    label: String,
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});
const Label = mongoose_1.default.model('Label', labelSchema);
exports.default = Label;

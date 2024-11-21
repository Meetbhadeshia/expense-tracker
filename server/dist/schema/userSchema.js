"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define User Schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true, // Ensures 'name' is required
        trim: true // Removes whitespace around the name
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures 'email' is unique
        trim: true,
        lowercase: true // Stores email in lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Enforces a minimum password length
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;

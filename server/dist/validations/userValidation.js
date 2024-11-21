"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schemaValidation = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(30)
        .required()
        .messages({
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name must not exceed 30 characters.',
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
    }),
    password: joi_1.default.string()
        .min(6)
        .max(128)
        .required()
        .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
        'string.max': 'Password must not exceed 128 characters.',
    }),
});

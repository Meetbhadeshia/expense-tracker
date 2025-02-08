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
exports.deleteUser = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidation_1 = require("../validations/userValidation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = userValidation_1.schemaValidation.validate(req.body, { abortEarly: false }); // Set `abortEarly: false` to show all errors
        if (error) {
            res.status(400).send({
                errors: error.details.map((detail) => detail.message), // Show all validation error messages
            });
            return;
        }
        const { name, email, password } = value;
        // Check if user already exists
        const existingUser = yield userSchema_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash the password before saving
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new userSchema_1.default({
            name: name,
            email: email,
            password: hashedPassword,
        });
        yield user.save();
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = yield userSchema_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Compare passwords
        const isPasswordValid = yield bcrypt_1.default.compare(password, user ? user.password : "");
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', user, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password } = req.body;
        // Find the user and update fields
        const updateData = { name, email, password };
        if (password) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            updateData.password = hashedPassword;
        }
        const updatedUser = yield userSchema_1.default.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield userSchema_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});
exports.deleteUser = deleteUser;

import User from '../schema/userSchema'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { schemaValidation } from '../validations/userValidation';
import jwt from 'jsonwebtoken'
const secretKey = process.env.JWT_SECRET as string;


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = schemaValidation.validate(req.body, { abortEarly: false }); // Set `abortEarly: false` to show all errors
        if (error) {
            res.status(400).send({
                errors: error.details.map((detail) => detail.message), // Show all validation error messages
            });
            return;
        }
        const { name, email, password } = value;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user ? user.password : "");
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, name, email, password } = req.body;

        // Find the user and update fields
        const updateData = { name, email, password };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
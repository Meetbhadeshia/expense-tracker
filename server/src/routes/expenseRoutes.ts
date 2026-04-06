import express from 'express'
const router = express.Router();
import { createExpense, readAllExpenses, editAnExpense, deleteAnExpense } from '../controllers/expenseControllers'
import { authenticate } from '../middlewares/auth';

// Routes
router.post('/', authenticate, createExpense)
router.get('/', authenticate, readAllExpenses)
router.put('/', authenticate, editAnExpense)
router.delete('/', authenticate, deleteAnExpense)

export default router
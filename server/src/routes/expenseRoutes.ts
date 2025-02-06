import express from 'express'
const router = express.Router();
import { authenticate } from '../middlewares/auth';
import { createExpense, readAllExpenses, editAnExpense, deleteAnExpense } from '../controllers/expenseControllers'

// Routes
router.post('/', createExpense)
router.get('/', authenticate, readAllExpenses)
router.put('/', editAnExpense)
router.delete('/', deleteAnExpense)

export default router
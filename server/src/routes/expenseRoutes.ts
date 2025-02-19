import express from 'express'
const router = express.Router();
import { createExpense, readAllExpenses, editAnExpense, deleteAnExpense } from '../controllers/expenseControllers'

// Routes
router.post('/', createExpense)
router.get('/', readAllExpenses)
router.put('/', editAnExpense)
router.delete('/', deleteAnExpense)

export default router
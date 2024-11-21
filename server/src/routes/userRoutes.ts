import express from 'express'
const router = express.Router();
import { createUser, loginUser, updateUser, deleteUser } from '../controllers/userControllers'

// Routes
router.post('/', createUser)
router.post('/login', loginUser)
router.put('/', updateUser)
router.delete('/:id', deleteUser)

export default router
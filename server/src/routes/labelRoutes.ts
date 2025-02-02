import express from 'express'
const router = express.Router();
import { createLabel } from '../controllers/labelControllers'

// Routes
router.post('/', createLabel)


export default router

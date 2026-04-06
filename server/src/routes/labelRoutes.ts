import express from 'express'
const router = express.Router();
import { createLabel, getLabelsAccordingToAUser, editLabel, deleteLabel } from '../controllers/labelControllers'
import { authenticate } from '../middlewares/auth';

// Routes
router.post('/', authenticate, createLabel)
router.get('/', authenticate, getLabelsAccordingToAUser)
router.put('/:id', authenticate, editLabel)
router.delete('/:id', authenticate, deleteLabel)

export default router
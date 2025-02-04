import express from 'express'
const router = express.Router();
import { createLabel, getLabelsAccordingToAUser, editLabel, deleteLabel } from '../controllers/labelControllers'

// Routes
router.post('/', createLabel)
router.get('/:userId', getLabelsAccordingToAUser)
router.put('/:id', editLabel)
router.delete('/:id', deleteLabel)

export default router
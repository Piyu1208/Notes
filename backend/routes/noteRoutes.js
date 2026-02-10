import express from 'express';

import {
    createNote,
    getAllNotes,
    getNoteById,
    deleteNote,
    updateNote,
    getUserNotes,
    archiveNote
} from '../controllers/noteController.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/notes', createNote);
//router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.delete('/notes/:id', deleteNote);
router.patch('/notes/:id', updateNote);
router.get('/notes', getUserNotes);
router.post('/notes/archive/:id', archiveNote);

export default router;
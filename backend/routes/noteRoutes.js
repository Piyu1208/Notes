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

import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/notes', createNote);

router.get('/notes/:id', getNoteById);
router.patch('/notes/:id', updateNote);
router.get('/notes', getUserNotes);
router.post('/notes/archive/:id', archiveNote);


router.use(restrictTo('admin'));
//router.get('/notes', getAllNotes);
router.delete('/notes/:id', deleteNote);

export default router;
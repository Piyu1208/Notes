import express from 'express';

import { getUsers,
    getUserById,
    deleteUser,
    updateUserRole
 } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUserRole);


export default router;


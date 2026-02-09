import express from 'express';

import { getUsers,
    getUserById,
    deleteUser,
    updateUserRole
 } from '../controllers/userController.js';

import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.use(protect);
router.use(restrictTo('admin'));

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUserRole);


export default router;


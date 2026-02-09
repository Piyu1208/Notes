import express from 'express';
import { signUp, login, refreshAccessToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);

router.post('/login', login);

router.post('/refresh', refreshAccessToken);


export default router;


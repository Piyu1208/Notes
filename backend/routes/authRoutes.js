import express from 'express';
import { signUp, login, refreshAccessToken, logout } from '../controllers/authController.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/signup', signUp);

router.post('/login', login);

router.post('/refresh', refreshAccessToken);

router.post('/logout', logout);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
  });
});


export default router;


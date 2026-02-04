import {
    signUpService
} from '../services/authService.js';

import signToken from '../utils/jwt.js';



export const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await signUpService(email, password);

        const token = signToken(user.id);

        res.status(201).json({
            status: 201,
            token,
            user
        });
        
    } catch (err) {
        next(err);
    }
};
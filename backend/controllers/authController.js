import bcrypt from 'bcrypt';

import {
    signUpService,
    findUserByEmailService
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
            data: user
        });
        
    } catch (err) {
        next(err);
    }
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: "Please provide email & password"
        });
    }

    try {
        const user = await findUserByEmailService(email);
        const password_hash = await bcrypt.hash(password, 10);

        const isPasswordCorrect = user.password_hash === password_hash;

        if (!user || !isPasswordCorrect) {
            res.status(400).json({
                status: 400,
                message: "Incorrect email or password"
            });
        }

        const token = signToken(user.id);

        res.status(200).json({
            status: 200,
            token,
            data: user
        });
    } catch (err) {
        next(err);
    }
};
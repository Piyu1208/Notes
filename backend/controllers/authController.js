import bcrypt from 'bcrypt';

import {
    signUpService,
    findUserByEmailService,
    storeTokenInDbService,
    deleteTokenService
} from '../services/authService.js';

import { signRefreshToken, signAccessToken } from '../utils/jwt.js';



export const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await signUpService(email, password);

        const refreshToken = signRefreshToken(user.id);

        const accessToken = signAccessToken(user.id);

        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

        await storeTokenInDbService(user.id, refreshToken, expiresAt);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.status(201).json({
            status: 201,
            message: 'Success',
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

        const refreshToken = signRefreshToken(user.id);

        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await deleteTokenService(user.id);

        await storeTokenInDbService(user.id, refreshToken, expiresAt);

        const accessToken = signAccessToken(user.id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({
            status: 200,
            data: user
        });

    } catch (err) {
        next(err);
    }
};
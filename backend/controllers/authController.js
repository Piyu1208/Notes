import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import {
    signUpService,
    findUserByEmailService,
    storeTokenInDbService,
    deleteTokenService,
    findRefreshTokenService,
    deleteTokenHashService
} from '../services/authService.js';

import { signRefreshToken, signAccessToken } from '../utils/jwt.js';

import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../utils/cookieOptions.js";



export const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: 'Please provide email & password'
        });
    }

    try {
        let user = await findUserByEmailService(email);

        if (user) {
            return res.status(400).json({
                status: 400,
                message: "User already exists"
            });
        }

        user = await signUpService(email, password);

        const refreshToken = signRefreshToken(user.id);
        const accessToken = signAccessToken(user.id);
        
        await storeTokenInDbService(
            user.id,
            refreshToken, 
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        );

        const safeUser = {
            id: user.id,
            email: user.email,
            created_at: user.created_at
        }

        res.cookie("refreshToken", refreshToken, refreshCookieOptions)
        .cookie('accessToken', accessToken, accessCookieOptions)
        .status(201).json({
            status: 201,
            message: 'Success',
            data: safeUser
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
        const isValid = await bcrypt.compare(password, user.password_hash)

        if (!user || !isValid) {
            res.status(400).json({
                status: 400,
                message: "Incorrect email or password"
            });
        }

        const refreshToken = signRefreshToken(user.id);

        await deleteTokenService(user.id);

        await storeTokenInDbService(
            user.id,
            refreshToken, 
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        );

        const accessToken = signAccessToken(user.id);

        const safeUser = {
            id: user.id,
            email: user.email,
            created_at: user.created_at
        }

        res.cookie("refreshToken", refreshToken, refreshCookieOptions)
        .cookie('accessToken', accessToken, accessCookieOptions)
        .status(200).json({
            status: 200,
            data: safeUser
        });

    } catch (err) {
        next(err);
    }
};


export const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorised"
            });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

        const tokenExists = await findRefreshTokenService(decoded.id, refreshToken);

        if (!tokenExists) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorised"
            });
        }

        await deleteTokenService(decoded.id);

        const newRefreshToken = signRefreshToken(decoded.id);
        const newAccessToken = signAccessToken(decoded.id);

        await storeTokenInDbService(
            decoded.id,
            newRefreshToken,
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        );

        res.cookie("refreshToken", newRefreshToken, refreshCookieOptions)
        .cookie("accessToken", newAccessToken, accessCookieOptions)
        .status(200).json({
            status: 200,
            message: 'Token refreshed'
        });


    } catch (err) {
        next(err);
    }
}


export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        await deleteTokenHashService(refreshToken);

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        res.status(200).json({
            message: 'Logged out successfully',
            data: req.user
        });

    } catch (err) {
        next(err);
    }
};
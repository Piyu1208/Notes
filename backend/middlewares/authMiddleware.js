import jwt from 'jsonwebtoken';

import { getUserByIdService } from '../services/userService.js';

export const protect = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
        return res.status(401).json({
            message: 'Not Authenticated'
        });
    }

    let decoded;
    try {
        decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Access token expired'
            });
        }
        return res.status(401).json({
            message: 'Invalid access token',
        });
    }


    try {
        const currentUser = await getUserByIdService(decoded.id);

        if(!currentUser) {
            return res.status(401).json({
                message: 'User no longer exists'
            });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        next(err);
    }
};


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You do not have permission'
            });
        }
        next();
    }
};
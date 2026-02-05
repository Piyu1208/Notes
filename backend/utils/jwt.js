import jwt from 'jsonwebtoken';

export const signRefreshToken = (id) => {
    return jwt.sign(
        { id },
        process.env.REFRESH_JWT_SECRET,
        { expiresIn: process.env.REFRESH_JWT_EXPIRES_IN },
    );
};

export const signAccessToken = (id) => {
    return jwt.sign(
        { id },
        process.env.ACCESS_JWT_SECRET,
        { expiresIn: process.env.ACCESS_JWT_EXPIRES_IN },
    );
};


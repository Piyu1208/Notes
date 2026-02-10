import db from '../db/postgres-config.js';
import bcrypt from 'bcrypt';

import crypto from 'crypto';

export const hashToken = (token) => {
    return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
}

export const signUpService = async (email, password) => {
    const password_hash = await bcrypt.hash(password, 10);

    const result = await db.query(`
        INSERT INTO users (id, email, password_hash)
        VALUES (gen_random_uuid(), $1, $2)
        RETURNING *`, [email, password_hash]);

    return result.rows[0];
};


export const findUserByEmailService = async (email) => {
    const result = await db.query(`
        SELECT * FROM users WHERE email = $1`, [email]);

    return result.rows[0];
};

export const storeTokenInDbService = async (user_id, refreshToken, expiresAt) => {
    const token_hash = hashToken(refreshToken);

    await db.query(`
        INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at)
        VALUES (gen_random_uuid(), $1, $2, $3)`, [user_id, token_hash, expiresAt]);
};


export const deleteTokenService = async (user_id) => {
    await db.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [user_id]);
};

export const findRefreshTokenService = async (user_id, refreshToken) => {
    const token_hash = hashToken(refreshToken);

    const result = await db.query(`
        SELECT * FROM refresh_tokens
        WHERE user_id = $1
        AND token_hash = $2
        AND expires_at > NOW()`, [user_id, token_hash]);

    return result.rows[0];
}


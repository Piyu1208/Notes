import db from '../db/postgres-config.js';
import bcrypt from 'bcrypt';

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



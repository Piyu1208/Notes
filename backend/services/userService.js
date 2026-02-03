import db from '../db/postgres-config.js';

export const getUsersService = async (page, limit, sortBy, order) => {
    const result = await db.query(`SELECT * FROM users ORDER BY ${sortBy} ${order} LIMIT $1 OFFSET $2`, [limit, page * limit]);
    return result.rows;
};

export const getUserByIdService = async (id) => {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

export const deleteUserService = async (id) => {
    await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
};

export const updateRoleService = async (role, id) => {
    const result = await db.query('UPDATE users SET role = $1 WHERE id = $2 RETURNING *', [role, id]);
    return result.rows[0];
}

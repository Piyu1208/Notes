const db = require('../db/postgres-config.js');

const getUsersService = async () => {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
};

const getUserByIdService = async (id) => {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

const deleteUserService = async (id) => {
    await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
};


module.exports = {
    getUsersService,
    getUserByIdService,
    deleteUserService
};
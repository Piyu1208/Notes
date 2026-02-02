const db = require('../db/postgres-config.js');

const getUsersService = async () => {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
};


module.exports = {
    getUsersService
};
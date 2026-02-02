
const db = require('../db/postgres-cofig.js');


const getUsers = async (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};




module.exports = { getUsers };
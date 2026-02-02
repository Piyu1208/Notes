require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();

app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

app.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});



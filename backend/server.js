require('dotenv').config();

const userRoutes = require('./routes/userRoutes.js');
const express = require('express');
const app = express();

app.use(express.json());


app.use(userRoutes);

app.listen(3000, () => {
    console.log('Running on port 3000');
});



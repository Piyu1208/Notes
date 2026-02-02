require('dotenv').config();

const userRoutes = require('./routes/userRoutes.js');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();

app.use(express.json());


app.use(userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Running on port 3000');
});



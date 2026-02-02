require('dotenv').config();

const userRoutes = require('./routes/userRoutes.js');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api', userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Running on port 3000');
});



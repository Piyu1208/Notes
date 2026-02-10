import 'dotenv/config';

import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import express from'express';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use('/api', authRoutes);

app.use('/api', noteRoutes);

app.use('/api', userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Running on port 3000');
});



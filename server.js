import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors'
import morgan from 'morgan'
import transactions from './routes/transactions.js'
import connectDB from './config/db.js';

dotenv.config({ path: './config/config.env' });

connectDB()
const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/transactions', transactions)

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`SERVER running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
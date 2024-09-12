require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config')
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from the frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;
connectDB;
app.use('/api/users', userRoutes);


app.listen(PORT, () => console.log(`Server running on Port ${config.PORT}`)) 

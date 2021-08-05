const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const todoRoutes = require('./todoRoutes');
const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use('/api/todo',todoRoutes);

app.get('/',(req, res) => {
    res.send('API is running...')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`Server running on port ${PORT}`));
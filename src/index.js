const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const transportistaRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', transportistaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
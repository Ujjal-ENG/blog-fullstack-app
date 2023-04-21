/* eslint-disable no-console */
/* eslint-disable indent */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
// env config
dotenv.config();

// mongodb Connection
connectDB();
// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'hello from server',
    });
});

// port
const PORT = process.env.PORT || 3000;
// listen
app.listen(PORT, () => {
    console.log('Server is runing at 8080 port');
});

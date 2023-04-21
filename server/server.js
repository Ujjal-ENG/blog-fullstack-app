/* eslint-disable indent */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

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

// listen

app.listen(8080, () => {
    console.log('Server is runing at 8080 port');
});

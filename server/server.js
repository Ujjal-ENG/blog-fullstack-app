/* eslint-disable no-console */
/* eslint-disable indent */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/usersRoutes');
const blogRoutes = require('./routes/blogsRoutes');
// env config
dotenv.config();
// router import

// mongodb Connection
connectDB();
// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

// port
const PORT = process.env.PORT || 3000;
// listen
app.listen(PORT, () => {
    console.log('Server is runing at 8080 port');
});

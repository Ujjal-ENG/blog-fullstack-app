/* eslint-disable indent */
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB COnnteced');
    } catch (error) {
        console.log(`MOngoDB connect Error${error}`);
    }
};

module.exports = connectDB;

/* eslint-disable comma-dangle */
/* eslint-disable indent */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, 'username is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        blogs: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Blog',
            },
        ],
    },
    { timesStamps: true }
);

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;

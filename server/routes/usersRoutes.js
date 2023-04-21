const express = require('express');
const { getAllUsers, registerUser, loginUser } = require('../controllers/usersControllers');

// router objects
const router = express.Router();

// get all users
router.get('/all-users', getAllUsers);
// create user
router.post('/register', registerUser);
// login User
router.post('/login', loginUser);


module.exports = router;

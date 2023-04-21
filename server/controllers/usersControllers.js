/* eslint-disable prettier/prettier */
// get all users
const usersModel = require('../model/usersModel');

exports.getAllUsers = (req, res) => {
  res.send('get all users');
};

// register users
exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password } = (req.body);

    //   if the fields are empty
    if (!userName || !email || !password) {
      res.status(500).json({
        message: 'please fill in all fields',
        success: false,
      });
    }

    // exsinting user
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      res.status(401).json({
        message: 'Users all ready exists',
        success: false,
      });
    }

    // save new user

    const user = await usersModel.create(req.body);
    res.status(201).json({
      message: 'User is Successfully created',
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error in Register Callback',
      success: false,
      error,
    });
  }
};

// login users
exports.loginUser = (req, res) => {};

/* eslint-disable prettier/prettier */
// get all users
const bcrypt = require('bcrypt');
const usersModel = require('../model/usersModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find();
    res.status(200).json({
      message: 'SuccessFully Data Fetched',
      success: true,
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      success: false,
      error,
    });
  }
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

    // hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user

    const user = await usersModel.create({ userName, email, password: hashedPassword });

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
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      res.status(401).json({
        message: 'Please Provide email and password',
        success: false,
      });
    }

    // check if user register or not
    const user = await usersModel.findOne({ email });
    if (!user) {
      res.status(200).json({
        message: 'Email is not registered,Please Register First then try to Login!!',
        success: false,
      });
    }

    // check password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      res.status(401).json({
        message: 'Password is Not Matched,Please Provided a valid password!!',
        success: false,
      });
    }

    // then login phase
    res.status(200).json({
      message: 'Login Successfully done',
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      success: false,
      error,
    });
  }
};

// user routes
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



const signToken = (id) => {
  return jwt.sign({ id }, "abc", {
    expiresIn: 10000,
  });
}

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    secure: true,
    httpOnly: true
  }

  // Remove the password from the output
  user.password = undefined;

  res.cookie('jwt', token, cookieOptions)
  res.status(statusCode).json({
    status: 'success',
    token,
    data:{
      user
    }
  })
}


router.post('/signup', async (req, res, next) => {
  const {name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  const ifExistingUser = await User.findOne({email: email});

  if (ifExistingUser) {
    return res.status(409).json({
      message: 'User already exists'
    });
  }


  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10)
  });

  const createdUser = await user.save();
  createAndSendToken(createdUser, 201, res);
});



router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if emails and password exist
  if (!email || !password) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if(!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }

  // 3) If everything okay, Send token to the client
  createAndSendToken(user, 200, res);
});

router.get('/logout', (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});

module.exports = router;













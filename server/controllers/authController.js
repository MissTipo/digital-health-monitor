const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel').default;

export async function signUp(req, res, next) {
  try {
    const { firstName, lastName } = req.body;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: { firstName: firstName, lastName: lastName },
      email: email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      {
        email: email,
        userId: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User created!',
      token: token,
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
export async function login(req, res, next) {
  try {
    // Receive the email and password from the request body
    const email = req.body.email;
    const password = req.body.password;

    //Query the database for the user with the email
    const existingUser = await User.findOne({ email: email });

    // if user is found then compare the password
    if (existingUser) {
      const isEqual = await bcrypt.compare(password, existingUser.password);

      // if the password is correct then generate a token
      if (isEqual) {
        const token = jwt.sign(
          {
            email: email,
            userId: existingUser._id,
          },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );

        // send the token to the client
        return res.status(200).json({
          message: 'Login successful!',
          token: token,
          userId: existingUser._id,
        });
      } else {
        return res.status(401).json({
          message: 'Authentication failed!',
        });
      }
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err });
  }

  function logOut(req, res, next) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully!' });
  }
}

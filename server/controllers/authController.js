import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';



export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" })
  }
  return res.status(200).json({ users })
}


export async function signUp(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    //const email = req.body.email;
    //const password = req.body.password;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: 'User created!',
      user
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
      /*
      if (isEqual) {
        const token = jwt.sign(
          {
            email: email,
            userId: existingUser._id,
          },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );*/

      // send the token to the client
      return res.status(200).json({
        message: 'Login successful!',
        //token: token,
        //userId: existingUser._id,
      });
    } else {
      return res.status(401).json({
        message: 'Authentication failed!',
      });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}
export function logOut(req, res, next) {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully!' });
}

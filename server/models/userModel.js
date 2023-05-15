//import { Schema as _Schema, model } from 'mongoose';
//const Schema = _Schema;
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  }

});


/*
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});
*/
const User = model('User', userSchema);

export default User;

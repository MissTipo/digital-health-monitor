import express from 'express';
import { Router } from 'express';
import User from '../models/userModel.js';
import { getAllUser } from '../controllers/authController.js';
// import { find, findById, findByIdAndDelete } from 'mongoose';

// Create a new user
const userrouter = Router();

userrouter.get("/", getAllUser);

userrouter.post('/api/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users

userrouter.get('/', async (req, res) => {
  try {
    const users = await find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// Get a user by id
userrouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findById(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by id
userrouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'password'];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid update!' });
  }
  try {
    const user = await findById(id);
    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
userrouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default userrouter;

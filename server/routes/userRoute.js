import { Router } from 'express';
const router = Router();
import User from '../models/userModel.js';
import mongoose from 'mongoose';
// import { find, findById, findByIdAndDelete } from 'mongoose';

// Create a new user

router.post('/api/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users

router.get('/', async (req, res) => {
  try {
    const users = await find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// Get a user by id
router.get('/:id', async (req, res) => {
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
router.patch('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export default router;

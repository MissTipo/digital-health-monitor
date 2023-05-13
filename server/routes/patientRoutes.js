import { Router } from 'express';
import Patient from '../models/patientModel.js';
import mongoose from 'mongoose';
// import { find, findById, findByIdAndDelete } from 'mongoose';



const router = Router();
// Create a new patient

router.post('/api/user', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all patients

router.get('/', async (req, res) => {
  try {
    const patients = await find({});
    res.send(patients);
  } catch (error) {
    res.status(500).send();
  }
});

// Get a patient by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await findById(id);
    if (!patient) {
      return res.status(404).send();
    }
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a patient by id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'gender', 'weight', 'medicalHistory'];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid update!' });
  }
  try {
    const patient = await findById(id);
    if (!patient) {
      return res.status(404).send();
    }
    updates.forEach((update) => (patient[update] = req.body[update]));
    await patient.save();
    res.send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a patient by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await findByIdAndDelete(id);
    if (!patient) {
      return res.status(404).send();
    }
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

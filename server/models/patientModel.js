import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

//Function to convert the first letter of each word to uppercase
function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

const patientSchema = new Schema({
  _id: _Schema.Types.ObjectId,
  name: {
    firstName: {
      type: String,
      required: true,
      set: toTitleCase,
    },
    lastName: {
      type: String,
      required: true,
      set: toTitleCase,
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^\d{10}$/,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  bloodGroup: {
    type: String,
  },
  geneticMakeup: {
    type: String,
    required: true,
  },
  medicalHistory: {
    symptoms: [
      {
        name: String,
        date: Date,
      },
    ],
    medicalConditions: [
      {
        name: String,
        diagnosisDate: Date,
        treatment: String,
      },
    ],
    allergies: [
      {
        type: String,
      },
    ],
    currentMedications: [
      {
        type: String,
      },
    ],
    surgeries: [{ type: String }],
    illnesses: [{ type: String }],
    hospitalizations: [{ type: String }],
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  },

  familyHistory: [
    {
      name: String,
      relationship: String,
      condition: String,
    },
  ],
  travelHistory: [
    {
      country: String,
      date: Date,
    },
  ],
});

const Patient = model('Patient', patientSchema);

export default Patient;

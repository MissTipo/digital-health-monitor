import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

//Function to convert the first letter of each word to uppercase
function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

const patientDemographics = new Schema({
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
  sex: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
});
const patientContactInfo = new Schema({
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phoneNumber: {
    type: Number,
    required: true,
    match: /^\d{10}$/,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
});
const patientMedicalInfo = new Schema({
  allergies: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  geneticMakeup: {
    type: String,
    required: true,
  },
  vitalSigns: [
    {
      bloodPressure: {
        type: Number,
        required: true,
      },
      heartRate: {
        type: Number,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
    },
  ],
  currentMedications: [
    {
      name: { type: String, required: true },
      dosage: {
        type: Number,
        required: true,
      },
      frequency: {
        type: Number,
        required: true,
      },
    },
  ],
});

const patientMedicalHistory = new Schema({
  pastMedicalConditions: [
    {
      name: {
        type: String,
        required: true,
      },
      diagnosisDate: {
        type: Date,
        required: true,
      },
      treatment: {
        type: String,
        required: true,
      },
    },
  ],
  surgeries: [
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  hospitalizations: [
    {
      hospital: {
        name: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
      },
      duration: {
        type: Number,
        required: true,
      },
      treatment: {
        type: String,
        required: true,
      },
    },
  ],
});
const patientDiagnoses = new Schema({
  currentDiagnosis: {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  previousDiagnoses: [
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});
const patientTestResults = new Schema({
  bloodTests: [
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      result: {
        type: String,
        required: true,
      },
    },
  ],
});
const patientFamilyHistory = new Schema({
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
  relationship: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
});
const patientTravelHistory = new Schema({
  country: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
});

const patientSchema = new Schema({
  demographics: patientDemographics,
  contactInfo: patientContactInfo,
  medicalInfo: patientMedicalInfo,
  medicalHistory: patientMedicalHistory,
  diagnoses: patientDiagnoses,
  familyHistory: patientFamilyHistory,
  travelHistory: patientTravelHistory,
  testResults: patientTestResults,
});

// Custom setter for the name.firstName and name.lastName fields
// patientSchema.path('name.firstName').set(toTitleCase);
// patientSchema.path('name.lastName').set(toTitleCase);

const Patient = model('Patient', patientSchema);

export default Patient;

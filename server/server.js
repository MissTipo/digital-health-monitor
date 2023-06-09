import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
const { urlencoded, json } = bodyParser;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost/dbDMI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', router);
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

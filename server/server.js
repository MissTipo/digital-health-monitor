import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authrouter from './routes/authRoutes.js';
import router from './routes/patientRoutes.js';
import userrouter from './routes/userRoute.js';
const { urlencoded, json } = bodyParser;
const app = express();
import dotenv from 'dotenv';
dotenv.config();


app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());

/*
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
*/

const port = 3000;
//mongo Atlas conection
const dburl = 'mongodb+srv://erickadikah2030:NKfmsqaBljsDkfag@cluster0.zql1bqg.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dburl,
).then(() => app.listen(`${port}`, () => console.log(`connecion to mongo db atlas succesfully on ${port}`)
)).catch((error) => console.log(error.message));

// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => app.listen(3001, () => console.log('connection to mongo db atlas succesfully')
// )).catch((error) => console.log(error.message));



// Connect to MongoDB
// mongoose
//   .connect('mongodb://localhost/dbDMI', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authrouter);
app.use('/api/user', userrouter);
app.use('/api/patient', router);

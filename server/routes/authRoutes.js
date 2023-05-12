import { Router } from 'express';
const authrouter = Router();
import { signUp, login, logOut } from '../controllers/authController.js';

authrouter.post('/signup', signUp);

authrouter.post('/login', login);

authrouter.post('logout', logOut);

export default authrouter;

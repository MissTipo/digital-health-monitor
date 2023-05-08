import { Router } from 'express';
const router = Router();
import { signUp, login, logOut } from '../controllers/authController.js';

router.post('/signup', signUp);

router.post('/login', login);

router.post('logout', logOut);

export default router;

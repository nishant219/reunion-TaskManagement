import express from 'express';
import { registerUser, loginUser, getUserProfile, deleteUser, logoutUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUserProfile);
router.delete('/delete', auth, deleteUser);
router.get('/logout', auth, logoutUser);

export default router;
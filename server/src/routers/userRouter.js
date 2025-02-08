import express from 'express';
import {logOut, checkAuth,loginUser, registerUser,updateProfile } from '../controllers/userController.js';
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post('/login', loginUser);


router.post('/signup', registerUser);


router.get('/checkAuth',  checkAuth)


router.put('/profile',updateProfile)

router.get('/logout',logOut)

export default router;

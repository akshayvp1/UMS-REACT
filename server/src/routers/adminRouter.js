import express from 'express';
import {adminLogout,getUsers,addUser,deleteUser,getAllUsers, updateUserProfilePicture,signIn,updateUserProfileName} from '../controllers/adminController.js'

const router = express.Router()

router.post('/signIn',signIn)
router.get('/users', getAllUsers);

router.get('/userss', getUsers);


router.patch('/users/:userId', updateUserProfileName);

router.patch('/users/:userId/profile-picture', updateUserProfilePicture);


router.delete('/users/:userId', deleteUser);

router.post('/add-user', addUser);

router.get('/logout',adminLogout)

export default router
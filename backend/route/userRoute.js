import express from 'express'
import { adminLogin, userLogin, getUserName, changePassword } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router()

userRouter.post('/Employee', userLogin);
userRouter.post('/Admin',adminLogin);
userRouter.get('/get',getUserName);
userRouter.post('/setting', adminAuth,changePassword);

export default userRouter;
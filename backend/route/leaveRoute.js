import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { addLeave, getLeave, listLeaves, getOneLeave, updateLeave } from '../controllers/leaveController.js';

const leaveRouter = express.Router();

leaveRouter.post('/add', adminAuth, addLeave);
leaveRouter.get('/get/:id', adminAuth, getLeave);
leaveRouter.get('/get', adminAuth, listLeaves);
leaveRouter.get('/getOne/:id', adminAuth, getOneLeave);
leaveRouter.put('/update/:id', adminAuth, updateLeave);

export default leaveRouter;
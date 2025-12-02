import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { addSalary, getSalary, getSalaryList } from '../controllers/salaryController.js';

const salaryRouter = express.Router();

salaryRouter.post('/add', adminAuth, addSalary);
salaryRouter.get('/get', adminAuth, getSalaryList);
salaryRouter.get('/getOne/:userId', adminAuth, getSalary);

export default salaryRouter;
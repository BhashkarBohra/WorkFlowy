import express from 'express'
import { addDepartment, listDepartment, removeDepartment, getDepartment, updateDepartment } from '../controllers/departmentController.js';
import adminAuth from '../middleware/adminAuth.js';


const departmentRouter = express.Router();

departmentRouter.post('/add', adminAuth, addDepartment);
departmentRouter.get('/list', adminAuth, listDepartment);
departmentRouter.post('/remove', adminAuth, removeDepartment);
departmentRouter.post('/getOne', adminAuth, getDepartment);
departmentRouter.put('/update/:id', adminAuth, updateDepartment);

export default departmentRouter;
import express from 'express'
import { addEmployee, listEmployee, getEmployee, updateEmployee, listEmployeeforDep, getSalary } from '../controllers/employeeController.js';
import adminAuth from '../middleware/adminAuth.js';
import multer from "multer"

const employeeRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


employeeRouter.post('/add',adminAuth, upload.single("image"), addEmployee);
employeeRouter.get('/list',adminAuth, listEmployee);
employeeRouter.get('/getOne/:id',adminAuth, getEmployee);
employeeRouter.put('/update/:id',adminAuth, updateEmployee);
employeeRouter.post('/department',adminAuth, listEmployeeforDep);
employeeRouter.post('/salary',adminAuth, getSalary);

export default employeeRouter;

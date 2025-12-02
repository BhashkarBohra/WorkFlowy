import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { getAttendence, updateAttendence, getAttendenceReport } from '../controllers/attendenceController.js';
import defaultAttendence from '../middleware/defultAttendence.js';

const attendenceRouter = express.Router();

attendenceRouter.get('/get', adminAuth, defaultAttendence, getAttendence);
attendenceRouter.put('/update/:id', adminAuth, updateAttendence);
attendenceRouter.get('/report/:date', adminAuth, getAttendenceReport);

export default attendenceRouter;
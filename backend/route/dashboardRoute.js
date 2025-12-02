import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { getDashboardData } from '../controllers/dashboardController.js';

const dashbordRouter = express.Router();

dashbordRouter.get('/get', adminAuth, getDashboardData);

export default dashbordRouter;
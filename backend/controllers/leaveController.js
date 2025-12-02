import { populate } from "dotenv";
import employeeModel from "../models/Employee.js";
import leaveModel from "../models/Leave.js";

const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, fromDate, toDate, description } = req.body;
        const employee = await employeeModel.findOne({ userId });
        const newLeave = new leaveModel({
            employeeId: employee._id,
            leaveType: leaveType,
            startDate: fromDate,
            endDate: toDate,
            reason: description
        })
        await newLeave.save()
        res.json({ success: true, message: "Leave Applied" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// get Leave 
const getLeave = async (req, res) => {
    try {
        const {id} = req.params;
        const employee = await employeeModel.findOne({ userId:id });
        const leaves = await leaveModel.find({employeeId:employee});
        res.json({success:true, data: leaves})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}
// List All Leaves 
const listLeaves = async (req, res) => {
    try {
        const leaves = await leaveModel.find().populate({path: 'employeeId', populate:[{path:'department'}, {path:"userId", select:'name'}]});
        res.json({success:true, data: leaves})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}
// get One Leave
const getOneLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await leaveModel.findById(id).populate({path: 'employeeId', populate:[{path:'department'}, {path:"userId", select:['name','profileImage']}]});
        res.json({success:true, data: leave})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}
// update Leave
const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await leaveModel.findByIdAndUpdate({ _id: id }, { status });
        res.json({success:true, message: "Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

export { addLeave, getLeave, listLeaves, getOneLeave, updateLeave }
import AttendenceModel from "../models/Attendence.js";
import employeeModel from "../models/Employee.js";

const defaultAttendence = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const existingAttendence = await AttendenceModel.findOne({date});
        if (!existingAttendence) {
            const employees = await employeeModel.find({});
            const attendence = employees.map(employee => ({date, employeeId:employee._id, status:null}));

            await AttendenceModel.insertMany(attendence)
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error at default attendence" })
    }
}

export default defaultAttendence;
import departmentModel from "../models/Department.js";
import employeeModel from "../models/Employee.js";
import leaveModel from "../models/Leave.js";

const getDashboardData = async (req, res) => {
    try {
        const totalEmployees = await employeeModel.countDocuments();
        const totalDepartments = await departmentModel.countDocuments();
        const totalSalaries = await employeeModel.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ]);
        const empAppliedForLeave = await leaveModel.distinct('employeeId')
        const leaveStatus = await leaveModel.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const leaveSummary = {
            appliedFor: empAppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: leaveStatus.find(item => item._id === "Pending")?.count || 0
        }
        res.json({ success: true, data: { totalEmployees, totalDepartments, totalSalary: totalSalaries[0]?.totalSalary || 0, leaveSummary } })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

export {getDashboardData}
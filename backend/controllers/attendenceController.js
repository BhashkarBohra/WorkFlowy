import AttendenceModel from "../models/Attendence.js";

const getAttendence = async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0]

        const attendence = await AttendenceModel.find({ date }).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        })
        res.json({ success: true, data: attendence })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

// update Attendence
const updateAttendence = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await AttendenceModel.findByIdAndUpdate({ _id: id }, { status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

// Get Attendence Report
const getAttendenceReport = async (req, res) => {
    try {
        const { date } = req.params;
        const report = await AttendenceModel.find({date}).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        });

        res.json({ success: true, data: report })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Hello error" })
    }
}


export { getAttendence, updateAttendence, getAttendenceReport }
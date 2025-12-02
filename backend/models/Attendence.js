import mongoose, { Schema } from 'mongoose';

const AttendenceSchema =new mongoose.Schema({
    date:{
        type: String, //format "yyyy-mm-dd"
        required: true
    },
    employeeId: {type: Schema.Types.ObjectId, ref: 'employee', required: true},
    status: { type: String, enum: ["Present", "Absent", "Sick", "Leave"], default: null },
})

const AttendenceModel = mongoose.model.attendence || mongoose.model("attendence", AttendenceSchema)
export default AttendenceModel
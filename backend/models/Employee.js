import mongoose, { Schema } from 'mongoose'

const employeeSchema = new mongoose.Schema({
    userId:{type: Schema.Types.ObjectId, ref:'user', required: true},
    employeeId:{type: String, required: true, unique:true},
    dob: {type: Date},
    gender: {type: String},
    marital_status: {type: String},
    designation: {type: String},
    department:{type: Schema.Types.ObjectId, ref:'department', required: true},
    salary: {type: Number, required:true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
})

const employeeModel = mongoose.model.employee || mongoose.model("employee", employeeSchema)
export default employeeModel
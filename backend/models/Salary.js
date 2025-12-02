import mongoose, { Schema } from "mongoose";

const salarySchema = new Schema({
    employeeId: {type: Schema.Types.ObjectId, ref: 'employee', required: true},
    basicSalary: {type: Number, required:true},
    allowances: {type: Number},
    deductions: {type: Number},
    netSalary: {type: Number},
    payDate: {type: Date, required:true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
})

const salaryModel = mongoose.model.salary || mongoose.model("salary", salarySchema)
export default salaryModel
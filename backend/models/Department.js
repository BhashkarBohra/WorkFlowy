import mongoose from 'mongoose'
import employeeModel from './Employee.js'
import leaveModel from './Leave.js'
import salaryModel from './Salary.js'

const departmentSchema = new mongoose.Schema({
    dep_name: {type: String, required:true},
    description: {type: String, required:true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
})

departmentSchema.pre("deleteOne", {document: true, query:false}, async function(next) {
    try {
        const employees = await employeeModel.find({department: this._id})
        const empId = employees.map(emp => emp._id)

        await employeeModel.deleteMany({department: this._id})
        await leaveModel.deleteMany({employeeId: {$in : empId}})
        await salaryModel.deleteMany({employeeId: {$in : empId}})
        next()
    } catch (error) {
        next(error)
    }
})

const departmentModel = mongoose.model.department || mongoose.model("department", departmentSchema)
export default departmentModel 
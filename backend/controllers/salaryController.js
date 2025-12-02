import employeeModel from "../models/Employee.js";
import salaryModel from "../models/Salary.js";

const addSalary = async (req, res) => {

    try {
        const { employeeId, basic_salary, allowances, deductions, pay_date } = req.body;
        const totalSalary = parseInt(basic_salary) + parseInt(allowances) - parseInt(deductions);
        const newSalary = new salaryModel({
            employeeId: employeeId,
            basicSalary: basic_salary,
            allowances: allowances,
            deductions: deductions,
            netSalary:totalSalary,
            payDate:pay_date
        })
        await newSalary.save()
        res.json({ success: true, message: "Salary added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// get All Salary
const getSalaryList = async (req,res)=>{
    try {
        const salaries = await salaryModel.find({}).populate('employeeId');
        res.json({success:true, data:salaries})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}
// get Salary
const getSalary = async (req,res)=>{
    try {
        const {userId} = req.params;
        const employee = await employeeModel.findOne({ userId });
        const salaries = await salaryModel.find({employeeId:employee});
        res.json({success:true, data:salaries})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

export { addSalary, getSalary, getSalaryList }
import userModel from "../models/User.js"
import employeeModel from "../models/Employee.js"
import bcrypt from "bcrypt"
import validator from 'validator'

// register employee 
const addEmployee = async (req, res) => {
    const { name, email, employeeId, dob, gender, marital_status, designation, department, salary, password, role } = req.body;
    let image_filename = `${req.file.filename}`;
    try {
        // checking is user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "user already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            role: role,
            profileImage: image_filename
        })

        const user = await newUser.save()

        const newEmployee = new employeeModel({
            userId: user._id,
            employeeId,
            dob,
            gender,
            marital_status,
            designation,
            department,
            salary
        })

        await newEmployee.save()
        res.json({ success: true, message: "Employee added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// all Employee list
const listEmployee = async (req, res) => {
    try {
        const employees = await employeeModel.find({}).populate('userId', { password: 0 }).populate('department');
        res.json({ success: true, data: employees })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}
// all Employee list for particular Department
const listEmployeeforDep = async (req, res) => {
    try {
        const {dep_id} = req.body;
        const employees = await employeeModel.find({department:dep_id}).populate('userId', { password: 0 }).populate('department');
        res.json({ success: true, data: employees })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

// get Employee
const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        let employee;
        employee = await employeeModel.findById(id).populate('userId', { password: 0 }).populate('department');
        if (!employee) {
            employee = await employeeModel.findOne({userId:id}).populate('userId', { password: 0 }).populate('department')
        }
        res.json({ success: true, data: employee })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}
// get salary of a Employee
const getSalary = async (req, res) => {
    try {
        const { id } = req.body;
        const employee = await employeeModel.findById(id).populate('userId', { password: 0 }).populate('department');
        res.json({ success: true, data: employee.salary })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

// update Employee
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, marital_status, designation, department, salary } = req.body;
        const employee = await employeeModel.findByIdAndUpdate({ _id: id }, {
            marital_status,
            designation,
            department,
            salary
        });
        await userModel.findByIdAndUpdate({ _id: employee.userId }, { name });
        res.json({ success: true, message: "Department Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

export { addEmployee, listEmployee, getEmployee, updateEmployee, listEmployeeforDep, getSalary }

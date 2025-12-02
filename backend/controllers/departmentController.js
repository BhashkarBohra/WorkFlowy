import departmentModel from '../models/Department.js';

// add Department

const addDepartment = async (req, res) => {
    const {dep_name, description} = req.body;
    const department = new departmentModel({
        dep_name,
        description
    })

    try {
        await department.save();
        res.json({success:true,message:"Department added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// all Department list
const listDepartment = async (req,res)=>{
    try {
        const departments = await departmentModel.find({});
        res.json({success:true, data:departments})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

// get departmetnt
const getDepartment = async (req,res)=>{
    try {
        const department = await departmentModel.findById(req.body.id);
        res.json({success:true, data:department})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

// remove Department
const removeDepartment = async (req, res)=>{
    try {
        const department = await departmentModel.findById(req.body.id);
        await department.deleteOne()
        res.json({success:true, message:"Department Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}
// update Department
const updateDepartment = async (req, res)=>{
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        await departmentModel.findByIdAndUpdate({_id:id}, {
            dep_name,
            description
        });
        res.json({success:true, message:"Department Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}
export { addDepartment, listDepartment, removeDepartment, getDepartment, updateDepartment }
import userModel from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const createToken = (id,role) => {
    return jwt.sign({ id,role }, process.env.JWT_SECRET)
}

// Route for employee login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        if(user.role!=='employee'){
            return res.json({ success: false, message: `Please Login as an ${user.role}` });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id,user.role);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }
        if(user.role!=='admin'){
            return res.json({ success: false, message: `Please Login as an ${user.role}` });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id,user.role);
        res.json({ success: true, token, user })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Route for change Password
const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await userModel.findById({_id:userId});

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Wrong Password" })
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        await userModel.findByIdAndUpdate({ _id:userId }, { password:hashedPassword });
        res.json({ success: true, message:'Password Changed' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// get user Name by token
const getUserName = async (req, res) => {
    try {
        const {token} = req.headers;
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!token_decode) {
            return res.json({success:false, message:"Token Not Valid"})
        }
        const {id, role} = token_decode;
        const user = await userModel.findOne({_id:id, role:role},{name:1, _id:1});
        if (!user) {
            return res.json({success:false, message:"User not Found"})
        }
        return res.json({success:true, data:user})
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Error"})
    }
}

export { userLogin, adminLogin, getUserName, changePassword }

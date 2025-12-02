import jwt from 'jsonwebtoken'
import userModel from '../models/User.js';

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.json({success:false, message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!token_decode) {
            return res.json({success:false, message:"Token Not Valid"})
        }

        const user = await userModel.find({_id:token_decode._id, role:token_decode.role});
        if (!user) {
            return res.json({success:false, message:"User not Found"})
        }
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Error"})
    }
}

export default adminAuth
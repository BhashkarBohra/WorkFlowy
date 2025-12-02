
import bcrypt from 'bcrypt'
import connectToDatabase from './config/db.js';
import userModel from './models/User.js';


// const userRegister = async () => {
//     connectToDatabase();
//     try {
//         const hashPassword = await bcrypt.hash("employee", 10)
//         const newUser = new userModel({
//             name: "Employee",
//             email: "employee@gmail.com",
//             password: hashPassword,
//             role: "employee"
//         })
//         await newUser.save()
//     } catch (error) {
//         console.log(error);
//     }
// }
const userRegister = async () => {
    connectToDatabase();
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new userModel({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch (error) {
        console.log(error);
    }
}

userRegister();
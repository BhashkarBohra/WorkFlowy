import mongoose from "mongoose";
import 'dotenv/config'

const connectToDatabase = async () =>{
    
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Db Connected")
    } catch (error) {
        console.log(error);
    }
}

export default connectToDatabase
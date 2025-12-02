import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectToDatabase from "./config/db.js"
import userRouter from "./route/userRoute.js"
import departmentRouter from "./route/departmentRoute.js"
import employeeRouter from "./route/employeeRoute.js"
import salaryRouter from "./route/salaryRoute.js"
import leaveRouter from "./route/leaveRoute.js"
import dashbordRouter from "./route/dashboardRoute.js"
import attendenceRouter from "./route/attendenceRoute.js"

// app config
const app = express()

const PORT=process.env.PORT || 3000

// middleware 
app.use(express.json())
app.use(cors())

// db connection
connectToDatabase();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use('/images',express.static('uploads'))
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/user", leaveRouter);
app.use("/api/dashboard", dashbordRouter);
app.use("/api/attendence", attendenceRouter);

app.get('/',(req,res)=>{
	res.send("API Working")
})

app.listen(PORT,()=>{
	console.log(`Server Started on http://localhost:${PORT}`)
})

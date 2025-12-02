import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeesManagement.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';


const AddEmployee = () => {
    const { backend_url, departmentList } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        employeeId: '',
        dob: '',
        gender: '',
        marital_status: '',
        designation: '',
        department: '',
        salary: '',
        password: '',
        role: ''
    })

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach((key)=>{
            formData.append(key, data[key])
        })

        formData.append("image", image)

        const response = await axios.post(`${backend_url}/api/employee/add`, formData,  {headers:{token}});
        if (response.data.success) {
            navigate('/admin/employees')
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }  
    }
    return (
        <div className="add-employees">
            <div className="add-emp-container">
                <h3>Add Employees</h3>
                <form onSubmit={onSubmitHandler}>
                    <div className="emp-form-container">
                        <div>
                        <p>Name</p>
                        <input onChange={onChangeHandler} type="text" name='name' value={data.name} placeholder='Enter Name' required />
                    </div>
                    <div>
                        <p>Email</p>
                        <input onChange={onChangeHandler} type="email" name='email' value={data.email} placeholder='Enter Email' required />
                    </div>
                    <div>
                        <p>Employee ID</p>
                        <input onChange={onChangeHandler} type="text" name='employeeId' value={data.employeeId} placeholder='Employee Id' required />
                    </div>
                    <div>
                        <p>Date of Birth</p>
                        <input onChange={onChangeHandler} type="date" name='dob' value={data.dob} required />
                    </div>
                    <div>
                        <p>Gender</p>
                        <select onChange={onChangeHandler} name="gender" required >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p>Marital Status</p>
                        <select onChange={onChangeHandler} name="marital_status" required >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>
                    <div>
                        <p>Designation</p>
                        <input onChange={onChangeHandler} type="text" name='designation' value={data.designation} placeholder='Designation' required />
                    </div>
                    <div>
                        <p>Department</p>
                        <select onChange={onChangeHandler} name="department" required >
                            <option value="">Select Department</option>
                            {departmentList.map((dep,index)=>(
                                <option key={index} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>Salary</p>
                        <input onChange={onChangeHandler} type="number" name='salary' value={data.salary} placeholder='Salary' required />
                    </div>
                    <div>
                        <p>Password</p>
                        <input onChange={onChangeHandler} type="password" name='password' value={data.password} placeholder='password' required />
                    </div>
                    <div>
                        <p>Role</p>
                        <select onChange={onChangeHandler} name="role" required >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div className='add-img-upload'>
                        <p>Upload Image</p>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" name='image' required />
                    </div>
                    </div>
                    <button type='submit' className='add-btn'>Add Employee</button>
                </form>
            </div>
        </div>
    )
}
export default AddEmployee;
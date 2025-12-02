import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeesManagement.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';

const EditEmployee = () => {
    const { id } = useParams();
    const { backend_url, departmentList, employee, fetchOneEmp } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');


    const [data, setData] = useState({
        name: employee.name,
        marital_status: employee.marital_status,
        designation: employee.designation,
        salary: employee.salary,
        department: employee.department
    })

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const response = await axios.put(`${backend_url}/api/employee/update/${id}`, data, { headers: { token } });
        if (response.data.success) {
            navigate('/admin/employees')
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        fetchOneEmp(token, id);
        console.log(employee)
    }, [])
    return (
        <div className="add-employees edit-emp">
            <div className="add-emp-container">
                <h3>Edit Employees</h3>
                <form onSubmit={onSubmitHandler}>
                    <div className="emp-form-container">
                        <div>
                            <p>Name</p>
                            <input onChange={onChangeHandler} type="text" name='name' value={data.name} placeholder='Enter Name' required />
                        </div>
                        <div>
                            <p>Marital Status</p>
                            <select onChange={onChangeHandler} name="marital_status" value={data.marital_status} required >
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
                            <p>Salary</p>
                            <input onChange={onChangeHandler} type="number" name='salary' value={data.salary} placeholder='Salary' required />
                        </div>
                    </div>
                    <div className='edit-emp-dep'>
                        <p>Department</p>
                        <select onChange={onChangeHandler} name="department" value={data.department._id} required >
                            <option value="">Select Department</option>
                            {departmentList.map((dep, index) => (
                                <option key={index} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>
                    <button type='submit' className='add-btn'>Add Employee</button>
                </form>
            </div>
        </div>
    )
}
export default EditEmployee;
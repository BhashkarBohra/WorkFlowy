import { useState, useContext } from 'react';
import './Salary.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';

const Salary = () => {
    const { backend_url, departmentList } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [employeeList, setEmployeeList] = useState([])
    const [data, setData] = useState({
        employeeId: '',
        basic_salary: '',
        allowances: '',
        deductions: '',
        pay_date: ''
    })
    
    const onChangeDepHandle = async (e) => {
        const dep_id= e.target.value;
        const response = await axios.post(`${backend_url}/api/employee/department`, {dep_id}, { headers: { token } });
        if (response.data.success) {
            setEmployeeList(response.data.data)
        }
        else {
            toast.error(response.data.message)
        }
    }
    const onChangeEmpHandle = async (e) => {
        const id = e.target.value;
        setData(data => ({ ...data, [e.target.name]: e.target.value }))
        const response = await axios.post(`${backend_url}/api/employee/salary`, {id}, { headers: { token } });
        if (response.data.success) {
            setData(data => ({...data, basic_salary:response.data.data}))
        }
        else {
            toast.error(response.data.message)
        }
    }
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const response = await axios.post(`${backend_url}/api/salary/add`, data, { headers: { token } });
        if (response.data.success) {
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }
    return (
        <div className="add-salary">
            <div className="add-salary-container">
                <h3>Add Employees</h3>
                <form onSubmit={onSubmitHandler}>
                    <div className="salary-form-container">
                        <div>
                            <p>Department</p>
                            <select onChange={onChangeDepHandle} name="department" required >
                                <option value="">Select Department</option>
                                {departmentList.map((dep, index) => (
                                    <option key={index} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>Employee</p>
                            <select onChange={onChangeEmpHandle} name="employeeId" required >
                                <option value="">Select Employee</option>
                                {employeeList.map((emp, index) => (
                                    <option key={index} value={emp._id}>{emp.userId.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>Basic Salary</p>
                            <input onChange={onChangeHandler} type="number" name='basic_salary' value={data.basic_salary} placeholder='Salary' required />
                        </div>
                        <div>
                            <p>Allowances</p>
                            <input onChange={onChangeHandler} type="number" name='allowances' value={data.allowances} placeholder='Monthly Allowances' required />
                        </div>
                        <div>
                            <p>Deductions</p>
                            <input onChange={onChangeHandler} type="number" name='deductions' value={data.deductions} placeholder='Monthly Deductions' required />
                        </div>
                        <div>
                            <p>Pay Date</p>
                            <input onChange={onChangeHandler} type="date" name='pay_date' value={data.pay_date} required />
                        </div>
                    </div>
                    <button type='submit' className='add-btn'>Add Employee</button>
                </form>
            </div>
        </div>
    )
}
export default Salary;

import './Salary'
import { use, useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmpViewSalary = () => {
    const { backend_url, user } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [salaries, setSalaries] = useState([])

    let count = 1;
    const fetchSalries = async () => {
        const response = await axios.get(`${backend_url}/api/salary/getOne/${user._id}`,{ headers: { token } });
        if (response.data.success) {
            setSalaries(response.data.data)
        }
        else {
            toast.error(response.data.message)
        }
    }

    useEffect(()=>{
        if (user._id) {
            fetchSalries()
        }
    },[user])
    return (
        <div className="salary-History">
            <div className="title">
                <h3>Salary History</h3>
            </div>

            <div className="salary-details">
                <div className="emp-salary-list-table title">
                    <b>S No.</b>
                    <b>Salary</b>
                    <b>Allowance</b>
                    <b>Deduction</b>
                    <b>Total</b>
                    <b>Pay Date</b>
                </div>
                {salaries.length === 0
                    ? <p>There are no employees to display</p>
                    : salaries.map((salary, index) => {
                    
                            return (
                                <div key={index} className='emp-salary-list-table'>
                                    <p>{count++}</p>
                                    <p>{salary.basicSalary}</p>
                                    <p>{salary.allowances}</p>
                                    <p>{salary.deductions}</p>
                                    <p>{salary.netSalary}</p>
                                    <p>{new Date(salary.payDate).toLocaleDateString()}</p>
                                </div>
                            )
                    })}

            </div>
        </div>
    )
}
export default EmpViewSalary;
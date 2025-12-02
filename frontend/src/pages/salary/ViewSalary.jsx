import { Link, useParams } from 'react-router-dom';
import './Salary'
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const ViewSalary = () => {
    const { id } = useParams();
    const { backend_url, salaryList } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [employeeId, setEmployeeId] = useState(id)

    let count = 1;
    
    return (
        <div className="salary-History">
            <div className="title">
                <h3>Salary History</h3>
            </div>
            <div className="salary-history-top">
                <input type="text" onChange={(e)=> setEmployeeId(e.target.value)} placeholder='Search By Emp ID' />
            </div>

            <div className="salary-details">
                <div className="salary-list-table title">
                    <b>S No.</b>
                    <b>Emp ID</b>
                    <b>Salary</b>
                    <b>Allowance</b>
                    <b>Deduction</b>
                    <b>Total</b>
                    <b>Pay Date</b>
                </div>
                {salaryList.length === 0
                    ? <p>There are no employees to display</p>
                    : salaryList.map((salary, index) => {
                        if (salary.employeeId.employeeId.toLowerCase().match(employeeId.toLowerCase())) {
                            return (
                                <div key={index} className='salary-list-table'>
                                    <p>{count++}</p>
                                    <p>{salary.employeeId.employeeId}</p>
                                    <p>{salary.basicSalary}</p>
                                    <p>{salary.allowances}</p>
                                    <p>{salary.deductions}</p>
                                    <p>{salary.netSalary}</p>
                                    <p>{new Date(salary.payDate).toLocaleDateString()}</p>
                                </div>
                            )
                        }
                    })}
                
            </div>
        </div>
    )
}
export default ViewSalary;
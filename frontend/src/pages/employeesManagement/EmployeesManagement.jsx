import { Link } from 'react-router-dom';
import './EmployeesManagement.css'
import { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const EmployeesManagement = () => {
    const { backend_url, employeeList } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [empName, setEmpName] = useState('')

    const filterEmployees = (e) => {
        setEmpName(e.target.value)
    }
    let count = 1;
    return (
        <div className="employeesManagement">
            <div className="title">
                <h3>Manage Employees</h3>
            </div>
            <div className="employees-top">
                <input type="text" onChange={filterEmployees} placeholder='Search Emp By Name' />
                <Link to="/admin/add-employees" ><button>Add new Department</button></Link>
            </div>

            <div className="employees-details">
                <div className="emp-list-table title">
                    <b>S No.</b>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Department</b>
                    <b>DOB</b>
                    <b>Action</b>
                </div>

                {employeeList.length === 0
                    ? <p>There are no employees to display</p>
                    : employeeList.map((emp, index) => {
                        if (emp.userId.name.toLowerCase().match(empName.toLowerCase())) {
                            return (
                                <div key={index} className='emp-list-table'>
                                    <p>{count++}</p>
                                    <div className='image'><img src={`${backend_url}/images/` + emp.userId.profileImage} alt="" /></div>
                                    <p>{emp.userId.name}</p>
                                    <p>{emp.department.dep_name}</p>
                                    <p>{new Date(emp.dob).toLocaleDateString()}</p>

                                    <div className="emp-action">
                                        <Link to={`/admin/view-employee/${emp._id}`}><button className='emp-view'>View</button></Link>
                                        <Link to={`/admin/edit-employee/${emp._id}`}><button className='emp-edit'>Edit</button></Link>
                                        <Link to={`/admin/view-salary/${emp.employeeId}`}><button className='emp-salary'>Salary</button></Link>
                                        <Link to={`/admin/view-leave-history/${emp.userId._id}`}><button className='dep-leave'>Leave</button></Link>
                                    </div>
                                </div>
                            )
                        }
                    })}
            </div>
        </div>
    )
}
export default EmployeesManagement;
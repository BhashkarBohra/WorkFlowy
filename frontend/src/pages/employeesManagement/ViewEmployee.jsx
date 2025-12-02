import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EmployeesManagement.css'
import { StoreContext } from '../../Context/StoreContext';

const ViewEmployee = () => {
    const { id } = useParams();
    const { employee, fetchOneEmp } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');

    useEffect(() => {
        fetchOneEmp(token, id);
    }, [])
    return (  
            <div className="view-emp-container">
                <h3>Employees Details</h3>
                <div className="view-emp-content">
                    <div>
                        <img src={employee.profileImage_path} alt="" />
                    </div>
                    <div className="view-emp-data">
                        <pre><b>Name:  </b> {employee.name}</pre>
                        <pre><b>Employee ID:  </b> {employee.emp_id}</pre>
                        <pre><b>Date of Birth:  </b> {employee.dob}</pre>
                        <pre><b>Gender:  </b> {employee.gender}</pre>
                        <pre><b>Department:  </b> {employee.department.dep_name}</pre>
                        <pre><b>Marital Status:  </b> {employee.marital_status}</pre>
                        <pre><b>Salary:  </b> {employee.salary}</pre>
                        <pre><b>Email:  </b> {employee.email}</pre>
                    </div>
                </div>
            </div>
    )
}
export default ViewEmployee
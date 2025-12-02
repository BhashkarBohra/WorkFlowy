import { useEffect, useContext, useState } from 'react';
import './MyProfile.css'
import { StoreContext } from '../../Context/StoreContext';

const MyProfile = () => {
    const { employee, fetchOneEmp, user, getUser } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [showLoader, setShowLoader]= useState(true)
    useEffect(()=>{
        if (user._id) {
            fetchOneEmp(token, user._id)
            setShowLoader(false)
        }
    },[user])
    return (
        <div className="profile-container">
            <h3>My Profile</h3>
            {showLoader?<p>Loading Profile Data...</p>:
            <div className="profile-content">
                <div>
                    <img src={employee.profileImage_path} alt="" />
                </div>
                <div className="profile-data">
                    <pre><b>Name:  </b> {employee.name}</pre>
                    <pre><b>Employee ID:  </b> {employee.emp_id}</pre>
                    <pre><b>Date of Birth:  </b> {employee.dob}</pre>
                    <pre><b>Gender:  </b> {employee.gender}</pre>
                    <pre><b>Department:  </b> {employee.department.dep_name}</pre>
                    <pre><b>Marital Status:  </b> {employee.marital_status}</pre>
                    <pre><b>Salary:  </b> {employee.salary}</pre>
                    <pre><b>Email:  </b> {employee.email}</pre>
                </div>
            </div>}
        </div>
    )
}
export default MyProfile
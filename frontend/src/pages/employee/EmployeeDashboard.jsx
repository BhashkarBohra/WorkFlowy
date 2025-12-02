import { useContext } from 'react';
import '../adminDashboard/AdminDashboard.css'
import { FaUser } from "react-icons/fa";
import { StoreContext } from '../../Context/StoreContext';


const EmployeeDashboard = () => {
    const {user} = useContext(StoreContext)
    return (
        <div className="admin-dash">
            <h1>Dashboard Overview</h1>
            <div className="admin-dash-boxes">
                <div className="admin-dash-container">
                    <div className="admin-dash-icon GBG">
                        <FaUser />
                    </div>
                    <div className="admin-dash-content">
                        <h3>Welcome ,</h3>
                        <p>{user.name}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default EmployeeDashboard;
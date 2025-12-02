import { NavLink} from 'react-router-dom';
import './Sidebar.css'
import { FaCalendarAlt, FaCogs, FaMoneyBillWave, FaUser } from 'react-icons/fa'
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
    return (
        <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/employee/dashboard' className="sidebar-option">
                <MdDashboard/>
                <p>Dashboard</p>
            </NavLink>
            <NavLink to='/employee/profile' className="sidebar-option">
                <FaUser />
                <p>My Profile</p>
            </NavLink>
            <NavLink to='/employee/leaves' className="sidebar-option">
                <FaCalendarAlt />
                <p>Leaves</p>
            </NavLink>
            <NavLink to='/employee/salary' className="sidebar-option">
                <FaMoneyBillWave />
                <p>Salary</p>
            </NavLink>
            <NavLink to='/employee/setting' className="sidebar-option">
                <FaCogs />
                <p>Setting</p>
            </NavLink>
        </div>
    </div>
    )
}

export default Sidebar;
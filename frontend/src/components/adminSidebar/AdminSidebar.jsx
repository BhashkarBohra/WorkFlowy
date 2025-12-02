import { NavLink} from 'react-router-dom';
import './AdminSidebar.css'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaRegCalendarAlt, FaUsers } from 'react-icons/fa'
import { AiOutlineFileText } from 'react-icons/ai'
import { MdDashboard } from "react-icons/md";

const AdminSidebar = () => {
    return (
        <div className='admin-sidebar'>
        <div className="admin-sidebar-options">
            <NavLink to='/admin/dashboard' className="admin-sidebar-option">
                <MdDashboard/>
                <p>Dashboard</p>
            </NavLink>
            <NavLink to='/admin/employees' className="admin-sidebar-option">
                <FaUsers />
                <p>Employees</p>
            </NavLink>
            <NavLink to='/admin/departments' className="admin-sidebar-option">
                <FaBuilding />
                <p>Departments</p>
            </NavLink>
            <NavLink to='/admin/leaves' className="admin-sidebar-option">
                <FaCalendarAlt />
                <p>Leaves</p>
            </NavLink>
            <NavLink to='/admin/salary' className="admin-sidebar-option">
                <FaMoneyBillWave />
                <p>Salary</p>
            </NavLink>
            <NavLink to='/admin/attendence' className="admin-sidebar-option">
                <FaRegCalendarAlt />
                <p>Attendence</p>
            </NavLink>
            <NavLink to='/admin/attendence-report' className="admin-sidebar-option">
                <AiOutlineFileText />
                <p>Attendence Report</p>
            </NavLink>
            <NavLink to='/admin/setting' className="admin-sidebar-option">
                <FaCogs />
                <p>Setting</p>
            </NavLink>
        </div>
    </div>
    )
}

export default AdminSidebar;
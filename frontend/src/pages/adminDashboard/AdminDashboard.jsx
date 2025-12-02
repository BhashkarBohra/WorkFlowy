import { useContext, useEffect, useState } from 'react';
import './AdminDashboard.css'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';

const AdminDashboard = () => {
    const { backend_url } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [data, setData] = useState({})
    const [showLoader, setShowLoader] = useState(true)

    const fetchDashboardData = async () => {
        const response = await axios.get(`${backend_url}/api/dashboard/get`, { headers: { token } });
        if (response.data.success) {
            setData(response.data.data)
        }
        else {
            toast.error(response.data.message)
        }
        setShowLoader(false)
    }

    useEffect(() => {
        fetchDashboardData();
    }, [])
    return (
        showLoader ? <p>Loading Data...</p>
            : <div className="admin-dash">
                <h1>Dashboard Overview</h1>
                <div className="admin-dash-boxes">
                    <div className="admin-dash-container">
                        <div className="admin-dash-icon GBG">
                            <FaUsers />
                        </div>
                        <div className="admin-dash-content">
                            <h3>Total Employees</h3>
                            <p>{data.totalEmployees}</p>
                        </div>
                    </div>
                    <div className="admin-dash-container">
                        <div className="admin-dash-icon YBG">
                            <FaBuilding />
                        </div>
                        <div className="admin-dash-content">
                            <h3>Total Departments</h3>
                            <p>{data.totalDepartments}</p>
                        </div>
                    </div>
                    <div className="admin-dash-container">
                        <div className="admin-dash-icon RBG">
                            <FaMoneyBillWave />
                        </div>
                        <div className="admin-dash-content">
                            <h3>Monthly Pay</h3>
                            <p>${data.totalSalary}</p>
                        </div>
                    </div>
                </div>
                <h1 className='h1-center'>Leave Details</h1>
                <div className="admin-dash-Second-boxes">
                    <div className="admin-dash-container">
                        <div className="admin-dash-icon">
                            <FaFileAlt />
                        </div>
                        <div className="admin-dash-content">
                            <h3>Leave Aplied</h3>
                            <p>{data.leaveSummary.appliedFor}</p>
                        </div>
                    </div>
                    <div className="admin-dash-container">
                        <div className="admin-dash-icon GBG">
                            <FaCheckCircle />
                        </div>
                        <div className="admin-dash-content">
                            <h3>Leave Aproved</h3>
                            <p>{data.leaveSummary.approved}</p>
                        </div>
                    </div>
                    <div className="admin-dash-container">
                        <div className="admin-dash-icon YBG">
                            <FaHourglassHalf />
                        </div>
                        <div className="admin-dash-content">
                            <h3>Leave Pending</h3>
                            <p>{data.leaveSummary.pending}</p>
                        </div>
                    </div>
                    <div className="admin-dash-container">
                        <div className="admin-dash-icon RBG">
                            <FaTimesCircle />
                        </div>
                        <div className="admin-dash-content">
                            <h3>Leave Rejected</h3>
                            <p>{data.leaveSummary.rejected}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default AdminDashboard;
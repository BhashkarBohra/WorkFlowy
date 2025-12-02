import { useContext, useEffect, useState } from 'react';
import './Leaves.css'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const EmpLeave = () => {
    const {backend_url, user} = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [leaves, setLeaves] = useState([])

    const fetchLeave = async () => {
            const response = await axios.get(`${backend_url}/api/leave/get/${user._id}`, { headers: { token } });
            if (response.data.success) {
                setLeaves(response.data.data)
            }
            else {
                console.log(response.data.message)
            }
        }

    let count = 1;

    useEffect(()=>{
        if (user._id) {
            fetchLeave();
        }
    },[user])
    return (
        <div className="leave-History">
            <div className="title">
                <h3>Leave History</h3>
            </div>
            <div className="leave-history-top">
                <input type="text" placeholder='Search By Date' />
                <Link to="/employee/add-leaves" ><button>Add Leave</button></Link>
            </div>

            <div className="leave-details">
                <div className="leave-list-table title">
                    <b>S No.</b>
                    <b>Leave Type</b>
                    <b>From</b>
                    <b>To</b>
                    <b>Description</b>
                    <b>Applied Date</b>
                    <b>Status</b>
                </div>
                {leaves.length === 0
                    ? <p>There are no leaves Data to display</p>
                    : leaves.map((leave, index) => {
                        if (true) {
                            return (
                                <div key={index} className='leave-list-table'>
                                    <p>{count++}</p>
                                    <p>{leave.leaveType}</p>
                                    <p>{new Date(leave.startDate).toLocaleDateString()}</p>
                                    <p>{new Date(leave.endDate).toLocaleDateString()}</p>
                                    <p>{leave.reason}</p>
                                    <p>{new Date(leave.appliedAt).toLocaleDateString()}</p>
                                    <p>{leave.status}</p>
                                </div>
                            )
                        }
                    })}
            </div>
        </div>
    )
}
export default EmpLeave;

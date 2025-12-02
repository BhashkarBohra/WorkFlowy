import { useContext, useEffect, useState } from 'react';
import './Leaves.css'
import { Link, useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LeaveHistory = () => {
    const { id } = useParams();
    const { backend_url } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [leaves, setLeaves] = useState([])
    const [status, setStatus] = useState('')

    const fetchLeave = async () => {
        const response = await axios.get(`${backend_url}/api/leave/get/${id}`, { headers: { token } });
        if (response.data.success) {
            setLeaves(response.data.data)
        }
        else {
            console.log(response.data.message)
        }
    }

    let count = 1;

    useEffect(() => {
        fetchLeave();
    }, [])
    return (
        <div className="leave-History">
            <div className="title">
                <h3>Leave History</h3>
            </div>
            <div className="leave-history-top">
                <input onChange={(e)=> setStatus(e.target.value)} type="text" placeholder='Search By Status' />
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
                        if ((leave.status.toLowerCase().match(status.toLowerCase()))) {
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
export default LeaveHistory;

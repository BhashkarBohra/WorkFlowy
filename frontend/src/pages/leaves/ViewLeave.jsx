import { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Leaves.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewLeave = () => {
    const { id } = useParams();
    const { backend_url, leave, fetchOneLeave } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');

    const navigate = useNavigate()
    const changeStatus = async (status) => {
        const response = await axios.put(`${backend_url}/api/leave/update/${id}`, { status }, { headers: { token } });
        if (response.data.success) {
            navigate('/admin/leaves')
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }
    useEffect(() => {
        fetchOneLeave(token, id);
    }, [])
    return (
        <div className="view-leave-container">
            <h3>Leave Details</h3>
            <div className="view-leave-content">
                <div>
                    <img src={leave.profileImage_path} alt="" />
                </div>
                <div className="view-leave-data">
                    <pre><b>Name:  </b> {leave.name}</pre>
                    <pre><b>Employee ID:  </b> {leave.emp_id}</pre>
                    <pre><b>Leave Type:  </b> {leave.leaveType}</pre>
                    <pre><b>Reason:  </b> {leave.reason}</pre>
                    <pre><b>Department:  </b> {leave.department.dep_name}</pre>
                    <pre><b>Start Date:  </b> {leave.startDate}</pre>
                    <pre><b>End Date:  </b> {leave.endDate}</pre>
                    {leave.status !== 'Pending'
                        ? <pre><b>Action:  </b> {leave.status}</pre>
                        : <div className="action">
                            <p>Action:</p>
                            <button onClick={() => changeStatus('Approved')} className='accept'>Accept</button>
                            <button onClick={() => changeStatus('Rejected')} className='reject'>Reject</button>
                        </div>}
                </div>
            </div>
        </div>
    )
}
export default ViewLeave
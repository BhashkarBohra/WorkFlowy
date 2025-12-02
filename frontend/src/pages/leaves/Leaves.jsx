import { useContext, useEffect, useState } from 'react';
import './Leaves.css'
import { Link, useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Leaves = () => {
    const { leaveList } = useContext(StoreContext)
    const [employeeId, setEmployeeId] = useState('')
    const [status, setStatus] = useState('')
    
    const filterLeaves = (status) => {
        setStatus(status)
    }

    let count = 1;

    return (
        <div className="leave-History">
            <div className="title">
                <h3>Leave History</h3>
            </div>
            <div className="leave-history-top">
                <input type="text" onChange={(e) => setEmployeeId(e.target.value)} placeholder='Search By Emp ID' />
                <div className="leave-filter">
                    <button onClick={() => filterLeaves('Pending')}>Pending</button>
                    <button onClick={() => filterLeaves('Approved')}>Approved</button>
                    <button onClick={() => filterLeaves('Rejected')} >Rejected</button>
                </div>
            </div>

            <div className="leave-details">
                <div className="leave-manage-list-table title">
                    <b>S No.</b>
                    <b>Emp ID</b>
                    <b>Name</b>
                    <b>Leave Type</b>
                    <b>Department</b>
                    <b>Days</b>
                    <b>Status</b>
                    <b>Action</b>
                </div>
                {leaveList.length === 0
                        ? <p>There are no leaves Data to display</p>
                        : leaveList.map((leave, index) => {
                            if (leave.employeeId.employeeId.toLowerCase().match(employeeId.toLowerCase()) && leave.status.match(status)) {
                                return (
                                    <div key={index} className='leave-manage-list-table'>
                                        <p>{count++}</p>
                                        <p>{leave.employeeId.employeeId}</p>
                                        <p>{leave.employeeId.userId.name}</p>
                                        <p>{leave.leaveType}</p>
                                        <p>{leave.employeeId.department.dep_name}</p>
                                        <p>{leave.leaveType}</p>
                                        <p>{leave.status}</p>
                                        <Link to={`/admin/view-leave/${leave._id}`}><button className='view-leave-detail'>View</button></Link>
                                    </div>
                                )
                            }
                        }
                        )
                }
            </div>
        </div>
    )
}
export default Leaves;

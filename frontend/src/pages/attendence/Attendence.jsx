import './Attendence.css'
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Attendence = () => {
    const { backend_url, employeeList } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [depName, setDepName] = useState('')
    const [attendences, setAttendences] = useState([])

    const fetchAttendence = async () => {
        const response = await axios.get(`${backend_url}/api/attendence/get`, { headers: { token } });
        if (response.data.success) {
            setAttendences(response.data.data)
        }
        else {
            toast.error(response.data.message)
        }
    }
    const changeStatus = async (status, id) => {
        const response = await axios.put(`${backend_url}/api/attendence/update/${id}`, { status }, { headers: { token } });
        if (response.data.success) {
            fetchAttendence()
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }
    const filterEmployees = (e) => {
        setDepName(e.target.value)
    }
    let count = 1;
    useEffect(() => {
        fetchAttendence()
    }, [])
    return (
        <div className="attendence">
            <div className="title">
                <h2>Manage Attendence</h2>
            </div>
            <div className="attendence-top">
                <input type="text" onChange={filterEmployees} placeholder='Search By Dep Name' />
                <Link to={'/admin/attendence-report'}><button>Attendence Report</button></Link>
            </div>
            <div className="title2">
                <h3>Mark Attendence for Date {new Date().toISOString().split('T')[0]}</h3>
            </div>

            <div className="attendence-details">
                <div className="attendence-table title">
                    <b>S No.</b>
                    <b>Name</b>
                    <b>Emp Id</b>
                    <b>Department</b>
                    <b>Action</b>
                </div>

                {attendences.length === 0
                    ? <p>There are no employees to display</p>
                    : attendences.map((attendence, index) => {
                        if (attendence.employeeId.department.dep_name.toLowerCase().match(depName.toLowerCase())) {
                            return (
                                <div key={index} className='attendence-table'>
                                    <p>{count++}</p>
                                    <p>{attendence.employeeId.userId.name}</p>
                                    <p>{attendence.employeeId.employeeId}</p>
                                    <p>{attendence.employeeId.department.dep_name}</p>
                                    {attendence.status === null
                                        ? <div className="attendence-action">
                                            <button onClick={() => changeStatus('Present',attendence._id)} className='attend-present'>Present</button>
                                            <button onClick={() => changeStatus('Absent',attendence._id)} className='attend-absent'>Absent</button>
                                            <button onClick={() => changeStatus('Sick',attendence._id)} className='attend-sick'>Sick</button>
                                            <button onClick={() => changeStatus('Leave',attendence._id)} className='attend-leave'>Leave</button>
                                        </div>
                                        : <p>{attendence.status}</p>
                                    }
                                </div>
                            )
                        }
                    })}
            </div>
        </div>
    )
}
export default Attendence;
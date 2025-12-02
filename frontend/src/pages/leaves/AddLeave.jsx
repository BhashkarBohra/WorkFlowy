import { useState, useContext } from 'react';
import './Leaves.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const AddLeave = () => {
    const { backend_url, user } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [data, setData] = useState({
        userId: user._id,
        leaveType: '',
        fromDate: '',
        toDate: '',
        description: ''
    })

    const navigate = useNavigate();
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const response = await axios.post(`${backend_url}/api/leave/add`, data, { headers: { token } });
        if (response.data.success) {
            navigate('/employee/leaves')
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }
    return (
        <div className="add-leave">
            <div className="add-leave-container">
                <h3>Request for Leave</h3>
                <form onSubmit={onSubmitHandler}>
                    <div className="leave-form-container">
                        <div>
                            <p>Leave Type</p>
                            <select onChange={onChangeHandler} name="leaveType" required >
                                <option value="">Select Department</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Annual Leave">Annual Leave</option>
                            </select>
                        </div>
                        <div className="leave-dates">
                            <div>
                                <p>From Date</p>
                                <input onChange={onChangeHandler} type="date" name='fromDate' value={data.fromDate} required />
                            </div>
                            <div>
                                <p>To Date</p>
                                <input onChange={onChangeHandler} type="date" name='toDate' value={data.toDate} required />
                            </div>
                        </div>

                        <div>
                            <p>Description</p>
                            <textarea onChange={onChangeHandler} name="description" rows="3" placeholder='Write Description' required></textarea>
                        </div>
                    </div>
                    <button type='submit' className='add-btn'>Add New Leave</button>
                </form>
            </div>
        </div>
    )
}
export default AddLeave;
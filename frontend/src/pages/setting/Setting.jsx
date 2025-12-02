import { useContext, useState } from 'react'
import './Setting.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../Context/StoreContext'

const Setting = () => {
    const { backend_url, user } = useContext(StoreContext);
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [data, setData] = useState({
        userId: user._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (data.newPassword !== data.confirmPassword) {
            toast.error('Password not confirmed')
        } else {
            const response = await axios.post(`${backend_url}/api/user/setting`, data, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/admin/dashboard')
            }
            else {
                toast.error(response.data.message)
            }
        }
    }
    return (
        <div className="setting">
            <div className="setting-container">
                <form onSubmit={onSubmitHandler} className="setting-form">
                    <div className="setting-title">
                        <h3>Change Password</h3>
                    </div>
                    <div className="setting-inputs">
                        <p>Old Password</p>
                        <input onChange={onChangeHandler} value={data.oldPassword} name="oldPassword" type="password" placeholder="Enter Password" required />
                    </div>
                    <div className="setting-inputs">
                        <p>New Password</p>
                        <input onChange={onChangeHandler} value={data.newPassword} name="newPassword" type="password" placeholder="Enter New Password" required />
                    </div>
                    <div className="setting-inputs">
                        <p>Confirm Password</p>
                        <input onChange={onChangeHandler} value={data.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password" required />
                    </div>
                    <button type="submit" >Change Password</button>
                </form>
            </div>
        </div>
    )
}

export default Setting
import { useContext, useState } from 'react'
import './LoginPop.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPop = ({ role, setToken }) => {
    const {backend_url} = useContext(StoreContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backend_url+'/api/user/'+role, {email,password});
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <>
            <Link to='/' ><button className='login-back'>Back</button></Link>

            <div className="loginPopup">
                <form onSubmit={onSubmitHandler} className="login-form">
                    <div className="login-title">
                        <h2>{role} Panel</h2>
                    </div>
                    <div className="login-popup-inputs">
                        <p>Email Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} name="email" type="email" placeholder="Your email" required />
                    </div>
                    <div className="login-popup-inputs">
                        <p>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} name="password" type="password" placeholder="Password" required />
                    </div>
                    <button type="submit" >Login</button>
                </form>
            </div>
        </>
    )
}

export default LoginPop
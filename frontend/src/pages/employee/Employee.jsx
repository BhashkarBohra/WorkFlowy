
import { useContext, useEffect, useState } from 'react';
import './Employee.css'
import LoginPop from '../loginPopup/LoginPop';
import { Outlet } from 'react-router-dom';
import NewNavbar from '../../components/newNavbar/NewNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { StoreContext } from '../../Context/StoreContext';

const Employee = () =>{
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');;
    const {getUser} = useContext(StoreContext)

    useEffect(()=>{
        localStorage.setItem('token', token);
        getUser(token)
    },[token])

    return (
        <div>
            {token === '' 
            ? <LoginPop role={'Employee'} setToken={setToken} /> 
            : <>
                    <NewNavbar role={'Employee'}/>
                    <hr />
                    <div className="admin-content">
                        <Sidebar />
                        <Outlet />
                    </div>
                </>}
        </div>
    )
}

export default Employee
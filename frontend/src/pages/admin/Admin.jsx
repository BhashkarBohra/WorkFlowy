
import { useContext, useEffect, useState } from 'react';
import './Admin.css'
import LoginPop from '../loginPopup/LoginPop';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';
import NewNavbar from '../../components/newNavbar/NewNavbar';
import { StoreContext } from '../../Context/StoreContext';

const Admin = () => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const {getUser} = useContext(StoreContext)

    useEffect(() => {
        localStorage.setItem('adminToken', token);
        getUser(token)
    }, [token])

    return (
        <div>
            {token === ''
                ? <LoginPop role={'Admin'} setToken={setToken} />
                : <>
                    <NewNavbar role={'Admin'}/>
                    <hr />
                    <div className="admin-content">
                        <AdminSidebar />
                        <Outlet />
                    </div>
                </>}
        </div>
    )
}

export default Admin
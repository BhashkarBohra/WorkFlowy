import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Departments.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';

const EditDepartment = () => {
    const {id} = useParams();
    const {backend_url} = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');

    const [department, setDepartment] = useState({
        dep_name:'',
        description:''
    })
    
    const navigate = useNavigate();

    const onChangeHandler = (e) =>{
        const {name, value} = e.target;
        setDepartment({...department, [name]:value})
    }

    const fetchOne = async () => {
        const response = await axios.post(`${backend_url}/api/department/getOne`, {id}, {headers:{token}});
        
        if (response.data.success) {
            setDepartment(response.data.data)
        }
        else{
            toast.error(response.data.message)
        }
    }
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        const response = await axios.put(`${backend_url}/api/department/update/${id}`, department, {headers:{token}});
        
        if (response.data.success) {
            navigate("/admin/departments")
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
    useEffect(()=>{
        fetchOne();
    },[])
    return (
        <div className="add-departments">
            <div className="add-container">
                <h3>Edit Department</h3>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <p>Department Name</p>
                        <input onChange={onChangeHandler} type="text" name='dep_name' value={department.dep_name} placeholder='Enter Dep Name' />
                    </div>
                    <div>
                        <p>Description</p>
                        <textarea onChange={onChangeHandler} name="description" value={department.description} rows="6" placeholder='Write Description' required></textarea>
                    </div>
                    <button type='submit' className='add-btn'>Edit Department</button>
                </form>
            </div>
        </div>
    )
}
export default EditDepartment;
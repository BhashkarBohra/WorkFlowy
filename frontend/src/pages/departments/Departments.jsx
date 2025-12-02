import { useContext, useEffect, useState } from 'react';
import './Departments.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';

const Departments = () => {
    const { backend_url, departmentList, removeDepartment, showLoader } = useContext(StoreContext)

    const [depName, setDepName] = useState('')


    const filterDepartments = (e) =>{
        setDepName(e.target.value)
    }

    let count = 1;

    return (
        <div className="departments">
            <div className="title">
                <h3>Manage Departments</h3>
            </div>
            <div className="departments-top">
                <input onChange={filterDepartments} type="text" placeholder='Search By Dep Name' />
                <Link to="/admin/add-departments" ><button>Add new Department</button></Link>
            </div>

            <div className="departments-details">
                <div className="list-table-format title">
                    <b>S No.</b>
                    <b>Department Name</b>
                    <b>Action</b>
                </div>

                {departmentList.length === 0
                    ? <p>There are no departments to display</p>
                    : departmentList.map((department, index) => {
                        if (department.dep_name.toLowerCase().match(depName.toLowerCase())) {
                            return (
                                <div key={index} className='list-table-format'>
                                    <p>{count++}</p>
                                    <p>{department.dep_name}</p>
                                    <div className="dep-action">
                                        <Link to={`/admin/edit-department/${department._id}`} ><button className='dep-edit'>Edit</button></Link>
                                        <button onClick={() => removeDepartment(department._id)} className='dep-delete'>Delete</button>
                                    </div>
                                </div>
                            )
                        }
                    })}
            </div>
        </div>
    )
}
export default Departments;
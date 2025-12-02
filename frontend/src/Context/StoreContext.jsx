import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
    const backend_url = "https://workflowy-backend.onrender.com"
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [userRole, setUserRole] = useState('');
    const [showLoader, setShowLoader] = useState(true)
    const [user, setUser] = useState({});
    const [departmentList, setDepartmentList] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [salaryList, setSalaryList] = useState([])
    const [leaveList, setLeaveList] = useState([])
    const [employee, setEmloyee] = useState({
        name: '',
        emp_id: '',
        dob: '',
        gender: '',
        department: '',
        designation: '',
        marital_status: '',
        salary: '',
        email: '',
        profileImage_path: null
    })
    const [leave, setLeave] = useState({
        leave_id: '',
        name: '',
        emp_id: '',
        leaveType: '',
        reason: '',
        department: '',
        startDate: '',
        endDate: '',
        status: '',
        profileImage_path: null
    })

    const getUser = async (token) => {
        const response = await axios.get(backend_url + '/api/user/get', { headers: { token } })
        if (response.data.success) {
            setUser(response.data.data)
        } else {
            console.log(response.data.message);
        }
    }

    const fetchDepartments = async (token) => {
        const response = await axios.get(backend_url + '/api/department/list', { headers: { token } })
        if (response.data.success) {
            setDepartmentList(response.data.data)
        } else {
            console.log(response.data.message);
        }
        setShowLoader(false)
    }

    const fetchEmployees = async (token) => {
        const response = await axios.get(backend_url + '/api/employee/list', { headers: { token } })
        if (response.data.success) {
            setEmployeeList(response.data.data)
        } else {
            console.log(response.data.message);
        }
    }
    const fetchSalries = async (token) => {
        const response = await axios.get(`${backend_url}/api/salary/get`, { headers: { token } });
        if (response.data.success) {
            setSalaryList(response.data.data)
        }
        else {
            console.log(response.data.message)
        }
    }

    const fetchLeaves = async (token) => {
        const response = await axios.get(`${backend_url}/api/leave/get`, { headers: { token } });
        if (response.data.success) {
            setLeaveList(response.data.data)
        }
        else {
            console.log(response.data.message)
        }
    }

    const removeDepartment = async (departmentId) => {
        const confirm = window.confirm("Do you want to delete ?")
        await fetchDepartments(localStorage.getItem("adminToken"));
        if (confirm) {
            const response = await axios.post(backend_url + '/api/department/remove', { id: departmentId }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error("Error");
            }
        }
    }

    const fetchOneEmp = async (token, id) => {
        const response = await axios.get(`${backend_url}/api/employee/getOne/${id}`, { headers: { token } });

        if (response.data.success) {
            const data = response.data.data;
            const empData = {
                name: data.userId.name,
                emp_id: data.employeeId,
                dob: new Date(data.dob).toLocaleDateString(),
                gender: data.gender,
                department: data.department,
                designation: data.designation,
                marital_status: data.marital_status,
                salary: data.salary,
                email: data.userId.email,
                profileImage_path: `${backend_url}/images/` + data.userId.profileImage
            }
            setEmloyee(empData)
        }
        else {
            toast.error(response.data.message)
        }
    }
    const fetchOneLeave = async (token, id) => {
        const response = await axios.get(`${backend_url}/api/leave/getOne/${id}`, { headers: { token } });

        if (response.data.success) {
            const data = response.data.data;
            const leaveData = {
                leave_id: data._id,
                name: data.employeeId.userId.name,
                emp_id: data.employeeId.employeeId,
                leaveType: data.leaveType,
                reason: data.reason,
                department: data.employeeId.department,
                startDate: new Date(data.startDate).toLocaleDateString(),
                endDate: new Date(data.endDate).toLocaleDateString(),
                status: data.status,
                profileImage_path: `${backend_url}/images/` + data.employeeId.userId.profileImage
            }
            setLeave(leaveData)
        }
        else {
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        async function loadDepartmentData() {
            if (token) {
                await fetchDepartments(localStorage.getItem("adminToken"));
            }
        }
        loadDepartmentData();
    }, [departmentList])

    useEffect(() => {
        async function loadData() {
            if (token) {
                await fetchEmployees(localStorage.getItem("adminToken"));
            }
        }
        loadData();
    }, [employeeList])
    useEffect(() => {
        async function loadLeaveData() {
            if (token) {
                await fetchLeaves(localStorage.getItem("adminToken"));
            }
        }
        loadLeaveData();
    }, [leaveList])

    useEffect(() => {
        async function loadUserData() {
            if (token) {
                await getUser(localStorage.getItem("adminToken"));
            }
            else if (localStorage.getItem("token")) {
                await getUser(localStorage.getItem("token"));
            }
        }
        loadUserData();
    }, [])

    useEffect(() => {
        async function loadSalryData() {
            if (token) {
                await fetchSalries(token);
            }
        }
        loadSalryData();
    }, [salaryList])

    const contextValue = {
        backend_url,
        token,
        setToken,
        userRole,
        setUserRole,
        departmentList,
        removeDepartment,
        employeeList,
        employee,
        fetchOneEmp,
        salaryList,
        user,
        getUser,
        leaveList,
        fetchOneLeave,
        leave,
        showLoader,
        setShowLoader
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;


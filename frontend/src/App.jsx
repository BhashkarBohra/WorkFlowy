import Admin from "./pages/admin/Admin"
import Employee from "./pages/employee/Employee"
import Home from "./pages/home/Home"
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import EmployeesManagement from './pages/employeesManagement/EmployeesManagement';
import Departments from './pages/departments/Departments';
import Leaves from './pages/leaves/Leaves';
import Salary from './pages/salary/Salary';
import Setting from './pages/setting/Setting';
import AddDepartments from "./pages/departments/AddDepartments";
import EditDepartment from "./pages/departments/EditDepartment";
import AddEmployee from "./pages/employeesManagement/AddEmployee";
import ViewEmployee from "./pages/employeesManagement/ViewEmployee";
import EditEmployee from "./pages/employeesManagement/EditEmployee";
import ViewSalary from "./pages/salary/ViewSalary";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyProfile from "./pages/profile/MyProfile";
import EmpLeave from "./pages/leaves/EmpLeave";
import AddLeave from "./pages/leaves/AddLeave";
import EmpViewSalary from "./pages/salary/EmpViewSalary";
import EmpSetting from "./pages/setting/EmpSettting";
import ViewLeave from "./pages/leaves/ViewLeave";
import LeaveHistory from "./pages/leaves/LeaveHistory";
import Attendence from "./pages/attendence/Attendence";
import AttendenceReport from "./pages/attendence/AttendenceReport";

const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} >
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/employees' element={<EmployeesManagement />} />
          <Route path='/admin/add-employees' element={<AddEmployee />} />
          <Route path='/admin/view-employee/:id' element={<ViewEmployee />} />
          <Route path='/admin/edit-employee/:id' element={<EditEmployee />} />
          <Route path='/admin/view-salary/:id' element={<ViewSalary />} />
          <Route path='/admin/departments' element={<Departments />} />
          <Route path='/admin/add-departments' element={<AddDepartments />} />
          <Route path='/admin/edit-department/:id' element={<EditDepartment />} />
          <Route path='/admin/leaves' element={<Leaves />} />
          <Route path='/admin/view-leave/:id' element={<ViewLeave />} />
          <Route path='/admin/view-leave-history/:id' element={<LeaveHistory />} />
          <Route path='/admin/salary' element={<Salary />} />
          <Route path='/admin/attendence' element={<Attendence />} />
          <Route path='/admin/attendence-report' element={<AttendenceReport />} />
          <Route path='/admin/setting' element={<Setting />} />
        </Route>
        <Route path='/employee' element={<Employee />} >
          <Route path='/employee/dashboard' element={<EmployeeDashboard />} />
          <Route path='/employee/profile' element={<MyProfile />} />
          <Route path='/employee/leaves' element={<EmpLeave />} />
          <Route path='/employee/add-leaves' element={<AddLeave />} />
          <Route path='/employee/salary' element={<EmpViewSalary />} />
          <Route path='/employee/setting' element={<EmpSetting />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

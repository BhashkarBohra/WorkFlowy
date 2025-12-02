import { useState } from 'react';
import './Attendence.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { Link } from 'react-router-dom';

const AttendenceReport = () => {
    const { backend_url } = useContext(StoreContext)
    const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [reports, setReports] = useState([]); // all loaded days
    const [empId, setEmpId] = useState('')
    const [date, setDate] = useState(new Date())

    const fetchReport = async (offset) => {
        date.setDate(date.getDate() - offset);  // 0ffset -> how many days back we've loaded
        const formattedDate = date.toISOString().split("T")[0];
        const response = await axios.get(`${backend_url}/api/attendence/report/${formattedDate}`, { headers: { token } });
        if (response.data.success) {
            setReports((prev) => [
                ...prev,
                { date: formattedDate, data: response.data.data }
            ]);
        }
        else {
            toast.error(response.data.message)
        }
    };


    useEffect(() => {
        fetchReport(0); // load today’s report initially
    }, []);

    const handleShowMore = () => {
        fetchReport(1);
    };
    const filterEmployees = (e) => {
        setEmpId(e.target.value)
    }
    const searchByDate = async (e) => {
        const searchDate =e.target.value;
        setDate(new Date(searchDate))
        const response = await axios.get(`${backend_url}/api/attendence/report/${searchDate}`, { headers: { token } });
        if (response.data.success) {
            setReports([{ date: searchDate, data: response.data.data }]);
        }
        else {
            toast.error(response.data.message)
        }
    }
    let count = 1;

    return (
        <div className="attendence-report">
            <div className="title">
                <h2 >Attendance Report</h2>
            </div>
            <div className="attendence-top">
                <input type="text" onChange={filterEmployees} placeholder='Search Emp By Id' />
                <div className="search-date">
                    <b>Search By Date</b>
                    <input type="Date" onChange={searchByDate}/>
            </div>
            </div>
            {reports.map((report, idx) => (
                <div key={idx} className='section'>
                    <h3 className="date">
                        Date: {report.date}
                    </h3>

                    <div className="attendence-details">
                        <div className="attendence-table title">
                            <b>S No.</b>
                            <b>Name</b>
                            <b>Emp Id</b>
                            <b>Department</b>
                            <b>Status</b>
                        </div>
                        {report.data.length === 0
                            ? <p>No attendance found</p>
                            : report.data.map((attendence, index) => {
                                if (attendence.employeeId.employeeId.toLowerCase().match(empId.toLowerCase())) {
                                    return (
                                        <div key={index} className='attendence-table'>
                                            <p>{count++}</p>
                                            <p>{attendence.employeeId.userId.name}</p>
                                            <p>{attendence.employeeId.employeeId}</p>
                                            <p>{attendence.employeeId.department.dep_name}</p>
                                            <p>{attendence.status}</p>

                                        </div>
                                    )
                                }
                            })}
                    </div>
                </div>
            ))}

            <button onClick={handleShowMore} className='show-more'>
                Show More
            </button>
        </div>
    )
}
export default AttendenceReport;
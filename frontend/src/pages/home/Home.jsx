import './Home.css'
import AppDownload from "../../components/AppDownload/AppDownload";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home">
                <div className="header-contents">
                    <h2>Manage Your global employee data effortlessly</h2>
                    <p>Automates various HR tasks, such as recruitment, onboarding, payroll, performance management, and employee engagement, allowing HR professionals to focus on strategic initiatives rather than administrative burdens.</p>
                    <div className="login-continue">
                        <Link to='/admin'><button >continue as Admin</button></Link>
                        <Link to='/employee'><button >continue as Employee</button></Link>
                    </div>
                </div>
            </div>
            <AppDownload />
            <Footer />
        </>
    )
}

export default Home
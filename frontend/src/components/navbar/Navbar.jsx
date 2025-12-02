import React from "react"
import './Navbar.css'
import { assets } from "../../assets/assets"
import { Link } from "react-router-dom"

const Navbar = () => {

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <div className="navbar-right">
        <button >Login</button>
        <div className="nav-login-dropdown">
          <Link to='/admin'><button >Admin</button></Link>
          <Link to='/employee'><button >Employee</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar

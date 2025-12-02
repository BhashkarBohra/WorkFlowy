import React, { useContext, useEffect } from "react"
import './NewNavbar.css'
import { StoreContext } from "../../Context/StoreContext"
import { useNavigate } from "react-router-dom"

const NewNavbar = ({role}) => {
  const {user} = useContext(StoreContext)
   const navigate = useNavigate();

  const logout = () =>{
    if (role==='Admin') {
      localStorage.removeItem('adminToken');
    }
    else{
      localStorage.removeItem('token')
    }
    navigate('/')
  }

  return (
    <div className="new-navbar">
      <div className="new-navbar-left">
        <h1 className="logo">WorkFlowy.</h1>
        <p>Hello, {user.name}</p>
      </div>
      <button onClick={logout} >LogOut </button>
    </div>
  )
}

export default NewNavbar

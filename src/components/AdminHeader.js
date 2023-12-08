import React from 'react'
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Tabs from './Tabs';
import {adminNavOption} from '../utils/globalData'

const AdminHeader = ({userType,status}) => {
    const  {isLoggedIn,setIsLoggedIn,userinfo:{profilestatus},logout}  = useContext(AuthContext);
    console.log("login",isLoggedIn)
    const navigate = useNavigate()
    let profilestatusclass = ['pending','accept','reject'];
    let profilestatustext = ['Pending','Active','Reject'];
    const handlelogout = () =>{
      logout()
      navigate('/')
    }

  return (
    <header>
        <div className="header-content">
            <Link to = {'/'}>
          <h1>Winnipeg Art Gallery {userType} Dashboard</h1>
          </Link>
          <ul className='header-nav'>
            {/* {isLoggedIn && 
            <li> <NavLink to={"/admin"} className={({isActive}) =>`${isActive ? "active" : ""}`}>Admin</NavLink></li>
            } */}
              {isLoggedIn && 
                <li className='userStatus'>   status : <span className={profilestatusclass[profilestatus]} >  {profilestatustext[profilestatus]}</span></li>
            }
              {isLoggedIn && 
            <li> <NavLink to={"/profile"} className={({isActive}) =>`${isActive ? "active" : ""}`}>Profile</NavLink></li>
            }
             {isLoggedIn && 
            <li><div className='logout' onClick={()=>handlelogout()}> Logout</div></li>
            }
           
        </ul>
        </div>
        <Tabs navOption={adminNavOption} userType={userType}/>

      </header>
  )
}

export default AdminHeader
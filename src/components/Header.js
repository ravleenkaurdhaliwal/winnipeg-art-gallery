import React from 'react'
import Tabs from './Tabs';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {basicNavOption} from '../utils/globalData'

 const Header = () => {
    const  {isLoggedIn,setIsLoggedIn,logout,userinfo:{usertype}}  = useContext(AuthContext);
    console.log("login",isLoggedIn)

  return (
    <header>
        <div className="header-content">
          <h1>Winnipeg Art Gallery</h1>
          <ul className='header-nav'>
          {!isLoggedIn && 
            <li>
                <NavLink to={"/login"} className={({isActive}) =>`${isActive ? "active" : ""}`}>
                Login 
                </NavLink>
            </li>
          }
           {!isLoggedIn && 
            <li> <NavLink to={"/signup"} className={({isActive}) =>`${isActive ? "active" : ""}`}>Signup</NavLink></li>
           }
            {isLoggedIn && usertype != "reader" &&
            <li> <NavLink to={"/admin"} className={({isActive}) =>`${isActive ? "active" : ""}`}>Admin</NavLink></li>
            }
              {isLoggedIn && 
            <li> <NavLink to={"/profile"} className={({isActive}) =>`${isActive ? "active" : ""}`}>Profile</NavLink></li>
            }
             {isLoggedIn && 
            <li><div className='logout' onClick={()=>logout()}> Logout</div></li>
            }
        </ul>
        </div>
       <Tabs navOption={basicNavOption}/>
      </header>
  )
}
export default Header;

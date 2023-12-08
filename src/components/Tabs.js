import React from 'react'
import {Link,NavLink} from "react-router-dom"

const Tabs = ({navOption,userType=""}) => {
  return (
    <nav>
          <ul>
            {navOption.map((nav,index)=>{
              return (
                <>
                {(nav['all'] || nav[userType] !== false) &&
                <li>
                <NavLink to={nav['link']} end className={({isActive}) =>`${isActive ? "active" : ""}`}>
                {nav['title']} 
                </NavLink>
                </li>
                }
                </>
                 
              )
            })

            }
        
            {/* <li>
                <NavLink to={"/"} className={({isActive}) =>`${isActive ? "active" : ""}`}>
                Home 
                </NavLink>
            </li>
            <li> <NavLink to={"/art"} className={({isActive}) =>`${isActive ? "active" : ""}`}>Art Collection</NavLink></li>
            <li> <NavLink to={"/exhibition"} className={({isActive}) =>`${isActive ? "active" : ""}`}>Exhibition</NavLink></li>
            <li> <NavLink to={"/education"} className={({isActive}) =>`${isActive ? "active" : ""}`}>Education Material</NavLink></li> */}
          </ul>
    </nav>
  )
}

export default Tabs
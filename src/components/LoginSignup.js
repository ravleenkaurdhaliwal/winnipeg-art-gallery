import React, { useEffect,useContext } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import {AuthContext} from '../context/AuthContext'
import { CookiesProvider, useCookies } from "react-cookie";
import { APIURL } from '../utils/globalData';

import axios from 'axios'

const Login = ({type}) => {
  const navigate = useNavigate()
  const  {isLoggedIn,setIsLoggedIn,setUserInfo,userinfo}  = useContext(AuthContext);

  const [isLogin,setLogin] = useState(()=>{if(type === "login"){return true}else{return false}})
  const [formData, setFormData] = useState({name: "",email: "",password: "",usertype:"admin",repassword:"",mobile: ""});
  const [cookies, setCookie] = useCookies();
  const [error,setError] = useState(false)
  const [errormsg,setErrorMsg] = useState(false)


  let switchOption = (switchtype) =>{
    setLogin (()=>{if(switchtype === "login"){return true}else{return false}})
    navigate(`/${switchtype}`)
  }
  const userlogin = async () => {
    try {
      const response = await axios.get(`${APIURL}/login&email=${formData['email']}&password=${formData['password']}`, {
        withCredentials: true,
      });
     
      const res = response.data;
      console.log("res",res)
      if (res.results.errorCode == 0) {
        setIsLoggedIn(true);
        let user = {...userinfo}
        let userdata = res.results.data;
        user.usertype=userdata.usertype;
        user.profilestatus=userdata.status;
        setCookie("sid", userdata.sid, { path: "/" });
        setUserInfo(user)
        navigate(`/`)
      } 
      else {
        setError(true)
        setErrorMsg(response.data.results.msg)
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error('Error checking login status:', error);
    }
  };

  const usersignup = async () => {

    axios.post(`${APIURL}/signup`, formData)
    .then(response => {
      console.log('Response:', response.data);
      if(response.data.results.errorCode == "0"){
        alert(response.data.results.msg);
        switchOption("login")
      }else{
          setError(true)
          setErrorMsg(response.data.results.msg)
         
      }
    })
    .catch(error => {
      // Handle error, log the error message
      console.error('Error:', error);
     
    });
   
  };
  let handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
   
    if(isLogin){
    userlogin();
    }else{
      usersignup();
    }
   
  }



  const handleChange = (event) => {
    const { name, value } = event.target;
   setError(false)
     if(name == "repassword"){
       let enteredpassword = formData['password'];
       if(!enteredpassword || value !== enteredpassword){
         alert("please enter same password")
       }
     }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

 
  return (
    <>
    <header>
     <div className="header-content">
        <Link to = {'/'}>
      <h1>Winnipeg Art Gallery</h1>
      </Link>
      </div>
    </header>
    <div className='loginformdiv'>
    {isLogin &&
    <div>Login</div>
    }
     {!isLogin &&
    <div>Signup</div>
    }
      <form id='login-form' onSubmit={(e)=>handleSubmit(e)} className='loginform' method='post'>
      {!isLogin &&
        <input className="logininput" type="text" placeholder="Username" required name="name" value={formData.name} onChange={handleChange} />
      }
       <input className="logininput" type="email" placeholder="Email" required name="email" value={formData.email} onChange={handleChange}/>
       
        <input className="logininput" type="password" placeholder="Password" required name="password" value={formData.password} onChange={handleChange}/>
        {!isLogin &&
        <>
        <input className="logininput" type="password" placeholder="Re Password" required name="repassword" value={formData.repassword} onChange={handleChange}/>
        <input className="logininput" type="mobile" placeholder="Mobile" required name="mobile" value={formData.mobile} onChange={handleChange} />
       
        

        <div className="select-dropdown">
        <select name="usertype" value={formData.usertype} onChange={handleChange}>
          <option value={"1"}>Admin</option>
          <option value={"2"}>Editor</option>
          <option value={"3"}>Creator</option>
          <option value={"4"}>Creator</option>
        </select>
      </div>
      </>
        }

      {error && 
    
       <div className='errortext'>{errormsg}</div>
    
      }

        
        <button className="loginbutton" type='submit'>{isLogin ? "LOGIN" : "SIGNUP"}</button>
        {!isLogin &&
       <label className="loginlabel"  onClick={()=>switchOption("login")}>Already Member ? Log In Now..</label>
        }
          {isLogin &&
       <label className="loginlabel" onClick={()=>switchOption("signup")}>Register</label>
        }
      </form>
     
    </div>
    </>
  )
}

export default Login
import React, { createContext, useState, useEffect } from 'react';
 import axios from 'axios';
// import Cookies from 'js-cookie';
import { useContext } from 'react';
import { APIURL } from '../utils/globalData';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  console.log("children",children)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userinfo,setUserInfo] = useState({usertype:"",profilestatus:""})

  useEffect(() => {
    console.log("useeffect")
   const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${APIURL}/islogin&sid=${Cookies.get('sid')}`, {
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
          user.sid=userdata.sid;
          user.uid=userdata.uid;
          setUserInfo(user)
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error('Error checking login status:', error);
      }
   };

    checkLoginStatus();
   //setIsLoggedIn(true);

  }, []);

  const isAuthenticated = () => {
    console.log("isloggedin",isLoggedIn)
    return isLoggedIn;
  };
  const logout = () => {
    Cookies.remove("sid")
    setIsLoggedIn(false);
    console.log("isloggedin",isLoggedIn)
    return isLoggedIn;
  };

  return (
    <AuthContext.Provider value={{ setIsLoggedIn ,isLoggedIn,isAuthenticated,userinfo,setUserInfo,logout}}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };
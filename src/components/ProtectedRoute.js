import React, { useContext } from 'react';
// import { Route, Navigate, Routes } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated,isLoggedIn } = useContext(AuthContext);
console.log("isLoggedIn",isLoggedIn)

  return (
    isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
  );
};

export default ProtectedRoute;


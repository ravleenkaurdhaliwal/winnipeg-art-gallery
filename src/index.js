import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { RouterProvider, Route, createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import ArtContent from "./components/ArtContent";
import ExhibitionContent from "./components/ExhibitionContent";
import EducationalContent from "./components/EducationalContent";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/LoginSignup";
import CreatorInfo from './components/admin/CreatorInfo'
import ContentsInfo from './components/admin/ContentsInfo'
import Requests from './components/admin/Requests'
import UserInfo from './components/admin/UserInfo'
import AdminHome from './components/admin/AdminHome'
import ContentCreation from './components/admin/ContentCreation'


let route = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' element={<App/>}>
        {/* <Route path='' element={<Home/>}/> */}
        <Route path="" element={<ArtContent/>} />
        <Route path="/art" element={<ArtContent/>} />
        <Route path="/exhibition" element={<ExhibitionContent/>} />
        <Route path="/education" element={<EducationalContent/>} />
       
    </Route>
    <Route path="/login" element={<Login type="login"/>} />
    <Route path="/signup" element={<Login type="signup"/>} />
    {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/admin" element={<AdminDashboard />} >
        <Route path='' element={<AdminHome/>}/>
        <Route path="/admin/contents" element={<ContentsInfo />} />
        <Route path="/admin/add-content" element={<ContentCreation />} />
        <Route path="/admin/requests" element={<Requests />} />
        <Route path="/admin/users-info" element={<UserInfo />} />
        <Route path="/admin/creators-info" element={<CreatorInfo />} />
      </Route>

    {/* Handle other routes */}
    {/* </Route> */}
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route}/>
      {/* <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="/art" element={<ArtContent />} />
            <Route path="/exhibition" element={<ExhibitionContent />} />
            <Route path="/education" element={<EducationalContent />} />
          </Route>
        </Routes>
      </Router> */}
    </AuthProvider>
  </React.StrictMode>
);

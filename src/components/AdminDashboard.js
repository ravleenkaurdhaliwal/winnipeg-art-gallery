import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
        <AdminHeader userType={"admin"} status={"accept"}/>
        <Outlet/>
    </div>
  )
}

export default AdminDashboard
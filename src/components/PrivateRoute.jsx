import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false }) => {
    const { user } = useSelector((state) => state.auth);
    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />
    }//show the page if user is not log in, otherwise redirect them to profile
    return user? <Outlet/>: <Navigate to="/login"/>; //private pages, show the page only if the user is log in
}

export default PrivateRoute
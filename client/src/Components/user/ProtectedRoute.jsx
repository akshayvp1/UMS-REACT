import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { clearUser, setAuthState, setUser } from '../../redux/slice/authSlice';
import axiosInstance from '../../utils/axiosInstance';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get("/auth/checkAuth");

                const user = response.data.user;
                if (user) {
                    dispatch(setUser(user))
                    dispatch(setAuthState())
                } else {
                    dispatch(clearUser()) 
                }

                setLoading(false); 
            } catch (error) {
                console.error("User is not authenticated:", error);
                dispatch(clearUser()) 
                setLoading(false); 
            }
        };

        fetchUserData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return isAuthenticated ? children : <Navigate to={'/login'} />
}

export default ProtectedRoute;

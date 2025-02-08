import React from 'react';
import './Dashboard.css'; 
import { LogOut } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get('/auth/logout');
  
      if (response.status === 200) {
        localStorage.removeItem('token');    
        navigate('/login'); 
        toast.success("Logout sucessfully")
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };
  

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="header">
          <h1 className='dash'>Welcome, User!</h1>
        </div>

        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut className="logout-icon" size={20} />
            Log Out
          </button>
          <button onClick={handleProfile} style={{ margin: "1px" }} className="logout-button1">Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

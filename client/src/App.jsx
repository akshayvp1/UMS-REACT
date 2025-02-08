import React from 'react';
import Login from './Components/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/user/DashBoard';
import UserProfile from './Components/user/UserProfile';
import ProtectedRoute from './Components/user/ProtectedRoute';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import AdiminLogin from './Components/admin/Login'
import AdminDashbord from './Components/admin/DashBord'
import AddUser from './Components/admin/AddUser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdiminLogin />} />
        <Route path="/admin-dashbord" element={<ProtectedRoute><AdminDashbord /></ProtectedRoute>} />
        <Route path="/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      </Routes>

      {/* ToastContainer should be outside Routes to work globally */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

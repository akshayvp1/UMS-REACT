import React from 'react';
import Login from './Page/user/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard from './Page/user/Home/Home';
// import UserProfile from './Page/user/Profile/Profile';
// import ProtectedRoute from './utils/ProtectedRoute';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
// import AdiminLogin from './Page/admin/Login/Login'
// import AdminDashbord from './Page/admin/Home/Home'
// import AddUser from './Page/admin/AddUser/AddUser'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/admin" element={<AdiminLogin />} />
        <Route path="/admin-dashbord" element={<ProtectedRoute><AdminDashbord /></ProtectedRoute>} />
        <Route path="/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} /> */}
        
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

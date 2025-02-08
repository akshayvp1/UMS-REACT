import React from 'react'
import Footer from '../../../Components/Admin/Footer/Footer'
import Navbar from '../../../Components/Admin/NavBar/NavBar'
import UserLogin from '../../../Components/Admin/AdminAuth/Login'
function Login() {
  return (
    <div>
     <Navbar/>
     <UserLogin/>
     <Footer/>
    </div>
  )
}

export default Login
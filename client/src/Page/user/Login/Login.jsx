import React from 'react'
import LoginUser from '../../../Components/User/Login/Login'
import Footer from '../../../Components/User/Footer/Footer'
import NavBar from '../../../Components/User/NavBar/NavBar'
function Login() {
  return (
    <div>
        <NavBar/>
        <LoginUser/>
        <Footer/>
    </div>
  )
}

export default Login
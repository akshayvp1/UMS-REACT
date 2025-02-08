import React from 'react'
import Footer from '../../../Components/Admin/Footer/Footer'
import Navbar from '../../../Components/Admin/NavBar/NavBar'
import Dashboard from '../../../Components/Admin/DashBord/DashBord'
function Home() {
  return (
    <div>
        <Navbar/>
        <Dashboard/>
        <Footer/>
    </div>
  )
}

export default Home
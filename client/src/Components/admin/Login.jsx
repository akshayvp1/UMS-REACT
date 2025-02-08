import React, { useState } from 'react'
import adminInstance from '../../utils/axiosInstance'; // Import the custom Axios instance
import './Login.css'
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword]= useState("")

    function handleEmail(event){
     setEmail(event.target.value)
    }
    function hadlePassword(event){
        setPassword(event.target.value)
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const credentials = {email,password}
        
        try{
            const response = await adminInstance.post('/admin/signin',credentials)

            console.log(response);
            

            if(response.data.success){
            localStorage.setItem('token', response.data.accessToken);
            toast.success("sucessfully Login")
            navigate('/admin-dashbord')
            }


        }catch(error){
          console.log(error.message);
          
        }


    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Admin</h2>
                <form  className="login-form" onSubmit={handleSubmit}>
                    

                    <div className="form-group">
                        <p>Email</p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleEmail}
                            value={email}
                            placeholder="Enter your email"
                        />
                        
                    </div>

                    <div className="form-group">
                        <p>Password</p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={hadlePassword}
                            value={password}
                            placeholder="Enter your password"
                        />
                    </div>

                    

                    <button type="submit" className="login-button" >login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthState, setUser } from "../../redux/slice/authSlice";
import axiosInstance from '../../utils/axiosInstance'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { validateEmail,validateName,validatePassword } from '../../utils/inputvalidation';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signState, setSignState] = useState("Sign In");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        
        if (name === 'name') {
            setErrors(prevErrors => ({
                ...prevErrors,
                name: validateName(value)
            }));
        }
        if (name === 'email') {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: validateEmail(value)
            }));
        }
        if (name === 'password') {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: validatePassword(value)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = signState === 'Sign In' ? '/auth/login' : '/auth/signup';

        
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        if (nameError || emailError || passwordError) {
            setErrors({ name: nameError, email: emailError, password: passwordError });
            return;
        }

        try {
            const response = await axiosInstance.post(url, formData);

            if (response.status === 200) {
                console.log(response.data.user)
                dispatch(setUser({ name: response.data.user.name, email: response.data.user.email }));
                dispatch(setAuthState())
                console.log(response.data.accessToken);
                
                localStorage.setItem('token', response.data.accessToken);
                toast.success('Successfully logged in');
                navigate('/dashboard'); 
            } else {
                toast.error(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="login-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="login-box">
                <h2>{signState}</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {signState === "Sign Up" && (
                        <div className="form-group">
                            <p>Name</p>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>} {/* Display error below input */}
                        </div>
                    )}

                    <div className="form-group">
                        <p>Email</p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>} {/* Display error below input */}
                    </div>

                    <div className="form-group">
                        <p>Password</p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>} {/* Display error below input */}
                    </div>

                    <div className='form-switch'>
                        {signState === 'Sign In' ? (
                            <p>
                                New to this?{' '}
                                <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
                            </p>
                        )}
                    </div>

                    <button type="submit" className="login-button" disabled={Object.values(errors).some(error => error)}>
                        {signState === 'Sign In' ? 'Login' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

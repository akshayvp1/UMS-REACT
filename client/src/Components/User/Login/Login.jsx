import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthState, setUser } from "../../../redux/slice/authSlice";
import axiosInstance from '../../../utils/axiosInstance'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail, validateName, validatePassword } from '../../../utils/inputvalidation';

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
                dispatch(setUser({ name: response.data.user.name, email: response.data.user.email }));
                dispatch(setAuthState())
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
        <div className=""style={{marginTop:50}}>
           
            
            <div className="">
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                        <ToastContainer position="top-right" autoClose={3000} />
                        
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                            {signState}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {signState === "Sign Up" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div className="text-center text-sm">
                                {signState === 'Sign In' ? (
                                    <p className="text-gray-600">
                                        New to this?{' '}
                                        <span 
                                            onClick={() => setSignState("Sign Up")}
                                            className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                                        >
                                            Sign Up Now
                                        </span>
                                    </p>
                                ) : (
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <span 
                                            onClick={() => setSignState("Sign In")}
                                            className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                                        >
                                            Sign In Now
                                        </span>
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={Object.values(errors).some(error => error)}
                                className="w-full py-2 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {signState === 'Sign In' ? 'Login' : 'Sign Up'}
                            </button>
                        </form>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Login;
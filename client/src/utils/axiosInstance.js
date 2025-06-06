import axios from 'axios';
import { toast } from 'react-toastify';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized access. Please log in again.');
      localStorage.removeItem('token');
      window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

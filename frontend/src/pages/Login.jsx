import React, {useState, useEffect} from 'react'
import Spinner from '../components/Spinner';
import axios from 'axios';
import {enqueueSnackbar, useSnackbar} from 'notistack';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Login = () => {

const [loading, setLoading] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('');
const navigate = useNavigate();
const {enqueueSnackbar} = useSnackbar();

const handleLogin = () => {
    const data = {
        email,
        password,
        role
    }
    setLoading(true);
    axios.post('http://localhost:5000/auth/login', data, { withCredentials: true })
    .then((res)=>{
        setLoading(false);
        console.log(res.data.message);
        enqueueSnackbar(res.data.message, {variant: 'success'}); 
        if(role==='Admin') 
        navigate('/adminHome');
        else
        navigate('/pickupHome');
    })
    .catch((error)=>{
        setLoading(false);
        enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
    })
};
return (
    <div>
      <Header></Header>
    <div className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-purple-200 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Login</h2>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-10 py-2 text-gray-900 bg-purple-100 border-none rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
            <span className="absolute left-3 top-2 text-gray-900 text-xl">
              <i className="fas fa-at"></i>
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-10 py-2 text-gray-900 bg-purple-100 border-none rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
            <span className="absolute left-3 top-2 text-gray-900 text-xl">
              <i className="fas fa-lock"></i>
            </span>
          </div>

          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-purple-100 border-none rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Pickup Man">Pickup Man</option>
            </select>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-2 mt-4 font-bold text-purple-100 bg-gray-900 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-50 transition"
          >
            LOGIN
          </button>

          <div className="text-center">
            <a href="#" className="text-gray-900 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Login;
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
  
    useEffect(() => {
      const performLogout = async () => {
        setLoading(true);
        try {
          const res = await axios.post('http://localhost:5000/auth/logout');
          setLoading(false);
          console.log(res.data.message);
          enqueueSnackbar(res.data.message, { variant: 'success' });
          navigate('/auth/login');
        } catch (error) {
          setLoading(false);
          enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
        }
      };
      performLogout();
    }, [enqueueSnackbar, navigate]);

    if(loading) {
        return <Spinner />
    }
}

export default Logout;
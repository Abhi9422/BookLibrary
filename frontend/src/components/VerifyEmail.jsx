import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const VerifyEmail = () => {
  const { token } = useParams(); 
  const { url } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage('Invalid verification link.');
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${url}/api/users/verify-email`, {
          params: { token },
        });

        setMessage(data.message);

        // Show success toast notification only if the user wasn't already verified
        if (data.message !== 'User is already verified.') {
          toast.success(data.message);
        }

      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Email verification failed.';
        setMessage(errorMessage);
        
      } finally {
        setLoading(false);
        setRedirecting(true);
        setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
      }
    };

    verifyEmail();
  }, [token, url, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Verifying your email...</p>
      </div>
    );
  }

  if (redirecting) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4">
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-20 w-20 md:h-32 md:w-32 border-t-4 border-b-4 border-purple-500"></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-16 w-16 md:h-28 md:w-28" alt="Redirecting Loader" />
        </div>
        <p className="text-center text-lg">Redirecting you...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold">{message}</h2>
        <p className="text-sm">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default VerifyEmail;

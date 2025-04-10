import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import Account from './Account';

const AuthenticationGate = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthenticationGate: useEffect triggered');

    const checkAuth = async () => {
      try {
        console.log('AuthenticationGate: Checking authentication status...');
        const response = await fetch('http://localhost:3001/auth/status');
        console.log('AuthenticationGate: Auth status response:', response);

        if (response.ok) {
          const data = await response.json();
          console.log('AuthenticationGate: Auth status data:', data);
          setIsLoggedIn(data.isLoggedIn);
        } else {
          console.log('AuthenticationGate: Auth status check failed (not ok status)');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('AuthenticationGate: Error checking auth:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [navigate]);

  console.log('AuthenticationGate: isLoggedIn state:', isLoggedIn);

  if (isLoggedIn === null) {
    console.log('AuthenticationGate: Rendering loading state');
    return <div>Checking authentication...</div>;
  }

  if (isLoggedIn) {
    console.log('AuthenticationGate: User is logged in, rendering AccountInfo');
    return <AccountInfo />;
  } else {
    console.log('AuthenticationGate: User is not logged in, rendering Account');
    return <Account />;
  }
};

export default AuthenticationGate;
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Account from './Account';
import AccountInfo from './AccountInfo';
import Register from './Register';

const AuthGate = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthState(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/auth/status', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        setAuthState({
          isAuthenticated: data.authenticated,
          user: data.user || null,
          loading: false
        });
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (responseData) => {
    localStorage.setItem('token', responseData.token);
    setAuthState({
      isAuthenticated: true,
      user: responseData.user,
      loading: false
    });
  };

  const handleRegisterSuccess = (responseData) => {
    localStorage.setItem('token', responseData.token);
    setAuthState({
      isAuthenticated: true,
      user: responseData.user,
      loading: false
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ? (
    <AccountInfo user={authState.user} onLogout={handleLogout} />
  ) : (
    <Routes>
      <Route path="/account" element={<Account onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
      <Route path="*" element={<Navigate to="/account" replace />} />
    </Routes>
  );
};

export default AuthGate;
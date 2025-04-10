import { useState, useEffect } from 'react';
import Account from './Account';
import AccountInfo from './AccountInfo';

const AuthenticationGate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/status', {
          credentials: 'include' // Important for sessions to work
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
        setUser(data.user || null);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading authentication status...</div>;
  }

  // Directly return the appropriate component
  return isAuthenticated ? <AccountInfo user={user} /> : <Account />;
};

export default AuthenticationGate;
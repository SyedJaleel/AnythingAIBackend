import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { authService } from './services/api';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = async () => {
    try {
      const response = await authService.getCurrentUser();
      setUser(response.data.user);
      setIsAuthenticated(true);
      setShowRegister(false);
    } catch (err) {
      console.error('Failed to get user info:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setShowRegister(false);
  };

  if (loading) {
    return <div className="app loading">Loading...</div>;
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <div className="auth-container-wrapper">
          <div className="auth-toggle">
            <button
              onClick={() => setShowRegister(false)}
              className={!showRegister ? 'active' : ''}
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className={showRegister ? 'active' : ''}
            >
              Register
            </button>
          </div>
          {showRegister ? (
            <Register onSuccess={handleAuthSuccess} />
          ) : (
            <Login onSuccess={handleAuthSuccess} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;

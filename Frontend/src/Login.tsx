import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { auth } from './api';

interface LoginProps {
  isRegisterMode?: boolean;
}

const Login: React.FC<LoginProps> = ({ isRegisterMode = false }) => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Determine if we're in register mode based on URL
  const isRegister = location.pathname === '/register' || isRegisterMode;

  // Clear form when switching between login/register
  useEffect(() => {
    setError('');
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    if (isRegister && !username) {
      setError('Username is required for registration');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting', isRegister ? 'registration' : 'login');
      console.log('Data:', { username, email, password: '***' });

      const response = isRegister
        ? await auth.register({ username, email, password })
        : await auth.login({ email, password });

      console.log('Auth successful:', response.data);
      login(response.data.token, response.data.user);
      
      // Navigate to dashboard after successful login/registration
      console.log('Navigating to dashboard...');
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // Extract error message
      const errorMessage = 
        error.response?.data?.error || 
        error.response?.data?.message || 
        error.message || 
        'Authentication failed';
      
      setError(errorMessage);
      
      // Log detailed error info
      if (error.response) {
        console.error('Error response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      
      {error && (
        <div style={{ 
          color: 'red', 
          padding: '10px', 
          marginBottom: '10px',
          border: '1px solid red',
          borderRadius: '4px',
          backgroundColor: '#fee'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={isRegister}
            style={{ width: '100%', padding: '10px', margin: '5px 0', boxSizing: 'border-box' }}
          />
        )}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '5px 0', boxSizing: 'border-box' }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '5px 0', boxSizing: 'border-box' }}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            margin: '10px 0',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
        </button>
      </form>

      <button 
        onClick={() => {
          // Navigate to the other route
          if (isRegister) {
            navigate('/login');
          } else {
            navigate('/register');
          }
          setError('');
          setEmail('');
          setPassword('');
          setUsername('');
        }}
        style={{ marginTop: '10px' }}
      >
        {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </div>
  );
};

export default Login;
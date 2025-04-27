import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    try {
      const response = await fetch('http://localhost:8000/login-details');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log(jsonData)
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

  return (
    <div className='Login-page'>
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        
        <button className="signin-redirect-btn" onClick={() => navigate('/signin')}>
          New here? Sign up
        </button>
      </form>
    </div>
    </div>
  );
}

export default Login;

import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/student', { replace: true }); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
  
      // Step 1: Prepare base user object
      const userInfo = {
        access_token: data.access_token,
        user_id: data.user_id,
        username: data.username,
        email: data.email,
        role: data.role,
      };
  
      let metaResponse;
  
      if (data.role === 'student') {
        metaResponse = await fetch(`http://localhost:8000/auth/student/meta/${data.user_id}`);
      } else if (data.role === 'teacher') {
        metaResponse = await fetch(`http://localhost:8000/auth/teacher/meta/${data.user_id}`);
      }
  
      if (metaResponse?.ok) {
        const meta = await metaResponse.json();
        Object.assign(userInfo, meta);
      }
  
      // Step 3: Store everything in localStorage as a single object
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      alert(`Welcome back, ${userInfo.username} 🧙‍♂️`);
  
      navigate(`/${data.role}`);
    } catch (error) {
      console.error('Login error:', error.message);
      alert(`Login failed: ${error.message}`);
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

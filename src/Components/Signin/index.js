import './index.css';
import { useState } from 'react';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

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
    <div className="login-container">
      <h2>Sign in</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your New Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text" 
          placeholder="Enter your New user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
        </select>

        <input
          type="password"
          placeholder="Enter your New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default Signin

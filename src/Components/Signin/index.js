import './index.css';
import { useState } from 'react';
import Select from 'react-select';

const roleOptions = [
  { value: 'student', label: '🧑‍🎓 Student' },
  { value: 'teacher', label: '🧙‍♂️ Teacher' },
  { value: 'parent', label: '👨‍👩‍👧 Parent' },
  { value: 'admin', label: '⚡ Admin' },
];


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signing up with:', email, password, role);
  };

  return (
    <div className="Signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
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

            <Select
              options={roleOptions}
              placeholder="Select Role"
              onChange={(selectedOption) => setRole(selectedOption.value)}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid gold',
                  borderRadius: '10px',
                  color: 'white',
                  boxShadow: 'none',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#1a1a1a',
                  border: '1px solid gold',
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? '#333' : '#1a1a1a',
                  color: 'gold',
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'white',
                }),
              }}
            />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

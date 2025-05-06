import React from 'react';
import './index.css';

const handleLogout = () => {
  localStorage.removeItem('userInfo');  // or sessionStorage.removeItem('token');
  alert('You have been logged out! 🪄');
  window.location.href = '/login'; // Navigate to login or landing page
};

const Navbar = () => {
  return (
    <nav className="navBarContainer">
      <div className="logo">🪄 Hogwarts Portal</div>
      <ul className="navLinks">
        <li><a href="/student">🏠 Common Hall</a></li>
        <li><a href="/student/assignments">📜 Chamber of Assignments</a></li>
        <li><a href="/chatbox">🧙‍♂️ Professor’s Help</a></li>
        <li onClick={handleLogout}><a href="/login">🚪Portal Exit</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

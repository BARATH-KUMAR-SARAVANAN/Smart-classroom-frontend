import React from 'react';
import './index.css';

const Navbar = () => {
  return (
    <nav className="navBarContainer">
      <div className="logo">🪄 Hogwarts Portal</div>
      <ul className="navLinks">
        <li><a href="/">🏠 Common Hall</a></li>
        <li><a href="/assignments">📜 Chamber of Assignments</a></li>
        <li><a href="/chatbox">🧙‍♂️ Professor’s Help</a></li>
        <li><a href="/login">🚪Portal Exit</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

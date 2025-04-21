import React from 'react';
import './index.css';

const Navbar = () => {
  return (
    <nav className="navBarContainer">
      <div className="logo">🪄 Hogwarts Portal</div>
      <ul className="navLinks">
        <li><a href="/">Common Hall</a></li>
        <li><a href="/assignments"> Chamber of <br/> Assignments</a></li>
        <li><a href="/attendance">Scrolls of <br/>Attendance</a></li>
        <li><a href="/doubtbot">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

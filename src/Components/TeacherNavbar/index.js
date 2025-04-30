import React from 'react';
import '../Navbar/index.css';

const TeacherNavbar = () => {
  return (
    <nav className="navBarContainer">
      <div className="logo">🪄 Hogwarts Portal</div>
      <ul className="navLinks">
        <li><a href="/teacher">🏠 Common Hall</a></li>
        <li><a href="/wizard/list">📚 Submissions</a></li>
        <li><a href="/assignment/forge">📜 Forge </a></li>
        <li><a href="/chatbox">🧙‍♂️ Spell Planner</a></li>
        <li><a href="/login">🚪Portal Exit</a></li>
      </ul>
    </nav> 
  );
};

export default TeacherNavbar;

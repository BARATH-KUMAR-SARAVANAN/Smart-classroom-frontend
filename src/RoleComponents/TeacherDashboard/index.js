import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <h1>Professor’s Dashboard</h1>
        <p>Welcome to Hogwarts. Select your magical duties below.</p>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h2>🪄 Create Assignments</h2>
          <p>Conjure MCQs, theory scrolls, and spell-uploaded PDFs.</p>
          <Link to='/assignment/forge'>
            <button className="action-button">Enter Chamber</button>
          </Link>
        </div>

        <div className="card">
          <h2>🧙‍♂️ Class Insights</h2>
          <p>View house-based progress, student performance, and trends.</p>
          <button className="action-button">Reveal Insights</button>
        </div>

        <div className="card">
          <h2>📚 Submissions</h2>
          <p>Examine homework scrolls, evaluate, and offer feedback spells.</p>
          <Link to='/teacher/assignment'>
            <button className="action-button">Check Scrolls</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

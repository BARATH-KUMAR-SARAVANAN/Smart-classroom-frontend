// TeacherAssignments.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TeacherNavbar from '../../Components/TeacherNavbar';
import './index.css'

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const userInfo = localStorage.getItem('userInfo');
  const teacherId = JSON.parse(userInfo).teacher_id

  useEffect(() => {
    fetch(`http://localhost:8000/teachers/assignments/${teacherId}`)
      .then(res => res.json())
      .then(data => setAssignments(data));
  }, [teacherId]);

  return (
    <div className='homePageContainer '>
      <TeacherNavbar/>
      <div className="teacher-dashboard">
        <header className="dashboard-header">
          <h1>Assignments</h1>
          <p>Select an assignment to review student submissions.</p>
        </header>
        <div className="dashboard-grid">
          {assignments.map(assignment => (
            <div key={assignment.id} className="card">
              <h2>{assignment.title}</h2>
              <p>Subject: {assignment.subject}</p>
              <p>Class: {assignment.class_name}</p>
              <Link to={`/assignments/${assignment.id}/submissions`}>
                <button className="action-button">Review Submissions</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;

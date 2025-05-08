import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import './index.css';

function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.user_id;
  const role = userInfo?.role;

  useEffect(() => {
    if (role === "student") {
      fetch(`http://localhost:8000/students/${userId}/assignments`)
        .then(res => res.json())
        .then(data => {
          setAssignments(data);
          setLoading(false);
        });
    }
  }, [userId, role]);

  const handleAssignmentClick = (assignmentId) => {
    console.log(assignmentId)
    navigate(`/student/assignment/${assignmentId}`);
  };

  return (
    <div className="assignment-page">
      <Navbar />
      <div className="assignment-content">
        <h1 className="assignment-heading">⚡ Your Hogwarts Assignments</h1>
        {loading ? (
          <p>Loading...</p>
        ) : assignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          <div className="assignment-grid">
            {assignments.map((assignment) => (
              <button
                key={assignment.id}
                className="assignment-card"
                onClick={() => handleAssignmentClick(assignment.id)}
              >
                <h2>{assignment.title}</h2>
                <p>Subject: {assignment.subject}</p>
                <p>Type: {assignment.assignment_type}</p>
                {assignment.due_date && (
                  <p>Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
}

export default AssignmentList;

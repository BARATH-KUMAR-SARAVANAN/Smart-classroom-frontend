import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const ass1 = {
  id: 1,
  type: "mcq",
  title: "Trignomentry",
  subject: "Maths"
};

const ass2 = {
  id: 2,
  type: "description",
  title: "Moment of Inertia",
  subject: "Physics"
};


function AssignmentList(props) {
  const [subjects, setSubjects] = useState(["Maths", "Physics"]);
  const [assignments, setAssignments] = useState([ass1, ass2]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();
  const { onAssignmentSelect } = props; // Getting the onAssignmentSelect function from props

  const onClickBack = () => {
    setSelectedSubject(null);
  };

  const goBack = () => {
    navigate(-1); // navigates to the previous page
  };

  const handleSubjectChange = async (subject) => {
    setSelectedSubject(subject);
    // Fetch assignments based on the selected subject (you can uncomment this part when the API is ready)
    // const response = await fetch(`http://localhost:8000/api/assignments?subject=${subject}`);
    // const data = await response.json();
    // setAssignments(data);
  };

  const handleAssignmentClick = (assignment) => {
    onAssignmentSelect(assignment); // Pass the selected assignment to the parent via the onAssignmentSelect function
    navigate(`/student/assignment/${assignment.id}`); // Navigate to the assignment detail page
  };

  return (
    <div className="assignment-list-container">
      <h1 className="assignment-list-title">🪄 Your Assignments</h1>
      {!selectedSubject ? (
        <div className="subject-selection">
          <button onClick={goBack}>Back</button>
          <h2>Choose your subject</h2>
          <div className="subject-list">
            {subjects.map((subject) => (
              <div
                key={subject}
                className="subject-item"
                onClick={() => handleSubjectChange(subject)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="assignment-list">
          <h2>Assignments for {selectedSubject}</h2>
          <button onClick={onClickBack}>Back</button>
          {assignments.map((assignment) => {
            if (assignment.subject === selectedSubject) {
              return (
                <div
                  key={assignment.id}
                  className="assignment-item"
                  onClick={() => handleAssignmentClick(assignment)} // Pass the assignment on click
                >
                  <h2>{assignment.title}</h2>
                  <p>Type: {assignment.type}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default AssignmentList;

// AssignmentSubmissions.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeacherNavbar from '../../Components/TeacherNavbar';
import './index.css';

const AssignmentSubmissions = () => {
  const { assignmentId } = useParams();
  const [groupedSubmissions, setGroupedSubmissions] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/teachers/assignments/${assignmentId}/submissions`)
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, submission) => {
          const { student_id, student_name } = submission;
          if (!acc[student_id]) {
            acc[student_id] = {
              student_name,
              submissions: []
            };
          }
          acc[student_id].submissions.push(submission);
          return acc;
        }, {});
        setGroupedSubmissions(grouped);
      });
  }, [assignmentId]);

  const evaluateAll = () => {
    const promises = groupedSubmissions[selectedStudentId].submissions.map(sub =>
      fetch(`http://localhost:8000/teachers/submissions/${sub.id}/evaluate`, {
        method: 'POST'
      }).then(res => res.json())
    );

    Promise.all(promises).then(updatedSubs => {
      setGroupedSubmissions(prev => ({
        ...prev,
        [selectedStudentId]: {
          ...prev[selectedStudentId],
          submissions: updatedSubs
        }
      }));
    });
  };

  return (
    <div className="homePageContainer">
      <TeacherNavbar />
      <div className="teacher-dashboard">
        <header className="dashboard-header">
          <h1>Submissions</h1>
          <p>Select a student to view and evaluate their responses.</p>
        </header>

        <div className="dashboard-grid">
          {Object.entries(groupedSubmissions).map(([studentId, { student_name }]) => (
            <div key={studentId} className="card" onClick={() => setSelectedStudentId(studentId)}>
              <h2>{student_name}</h2>
              <p>Click to review responses</p>
            </div>
          ))}
        </div>

        {selectedStudentId && (
          <div className="response-table-container">
            <h2>Responses of {groupedSubmissions[selectedStudentId].student_name}</h2>
            <table className="response-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Question</th>
                  <th>Answer Given</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {groupedSubmissions[selectedStudentId].submissions.map((sub, idx) => (
                  <tr key={sub.id}>
                    <td>{idx + 1}</td>
                    <td>{sub.question_text}</td>
                    <td>{sub.response || <a href={sub.file_url} target="_blank" rel="noreferrer">View File</a>}</td>
                    <td>{sub.obtained_marks ?? 'Not Evaluated'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="action-button" onClick={evaluateAll}>Evaluate All</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentSubmissions;

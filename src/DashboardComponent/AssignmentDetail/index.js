import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
import Navbar from '../../Components/Navbar';

const AssignmentDetail = () => {
  const { id } = useParams(); // Get the assignment ID from the URL
  const [assignment, setAssignment] = useState(null); // State to store the assignment details
  const [answers, setAnswers] = useState({}); // State to store answers for each question
  const navigate = useNavigate();
 
  useEffect(() => {

    const fetchAssignmentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/students/${id}/questions`);
        if (!response.ok) {
          throw new Error("Failed to fetch assignment questions");
        }
        const data = await response.json();
        setAssignment({
          id,
          title: "Assignment Title", // You might want to fetch this as well
          subject: "Subject Name",   // You might want to fetch this as well
          type: "mcq",               // You might want to fetch this as well
          questions: data
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchAssignmentDetails();
  }, [id]);
  

  const handleSubmit = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const studentId = userInfo?.user_id;

  const formData = new FormData();
  formData.append("assignment_id", assignment.id);
  formData.append("student_id", studentId);

  const responses = [];

  for (const question of assignment.questions) {
    const answer = answers[question.id];
    if (assignment.type === "file upload" && answer instanceof File) {
      formData.append("files", answer);
      responses.push({
        question_id: question.id,
        file_name: answer.name
      });
    } else {
      responses.push({
        question_id: question.id,
        response: answer
      });
    }
  }

  formData.append("responses", JSON.stringify(responses));

  try {
    const response = await fetch("http://localhost:8000/students/student_responses/", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Failed to submit responses");
    }

    alert("Assignment submitted!");
    navigate("/student/assignments");
  } catch (error) {
    console.error(error);
    alert("An error occurred while submitting the assignment.");
  }
};


  const handleInputChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const handleFileChange = (e, questionId) => {
    const file = e.target.files[0];
    setAnswers({ ...answers, [questionId]: file });
  };

  if (!assignment) {
    return <div>Loading...</div>; // Show loading state while assignment data is being fetched
  }

  return (
    <div className='assignment-detail-page'>
      <Navbar/>
      <div className="assignment-detail-container">
        <h1 className="assignment-title">{assignment.title}</h1>
        <h2 className="assignment-subject">Subject: {assignment.subject}</h2>
        <h3 className="assignment-type">Type: {assignment.type}</h3>

        <div className="assignment-questions">
        {assignment.questions.map((question) => {
          const options = typeof question.options === "string"
            ? JSON.parse(question.options)
            : question.options;

          return (
            <div key={question.id} className="assignment-question">
              <p className="question-text">{question.question_text}</p>

              {assignment.type === "mcq" && (
                <div className="options">
                  {options.map((option, index) => (
                    <div key={index} className="option">
                      <input
                        type="radio"
                        id={`q${question.id}-option${index}`}
                        name={`question${question.id}`}
                        value={option}
                        onChange={(e) => handleInputChange(e, question.id)}
                      />
                      <label htmlFor={`q${question.id}-option${index}`} className="option-label">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}

      {assignment.type === "description" && (
        <textarea
          className="answer-input"
          placeholder="Write your answer here..."
          value={answers[question.id] || ""}
          onChange={(e) => handleInputChange(e, question.id)}
        />
      )}

      {assignment.type === "file upload" && (
        <input
          type="file"
          className="file-input"
          onChange={(e) => handleFileChange(e, question.id)}
        />
      )}
    </div>
  );
})}

          
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Assignment
        </button>
      </div>
    </div>
  );
};

export default AssignmentDetail;

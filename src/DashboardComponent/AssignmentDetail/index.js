import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
import Navbar from '../../Components/Navbar';

const AssignmentDetail = () => {
  const { id } = useParams(); // Get the assignment ID from the URL
  const [assignment, setAssignment] = useState(null); // State to store the assignment details
  const [assignment2, setAssignment2] = useState(null); // State to store the assignment details
  const [answers, setAnswers] = useState({}); // State to store answers for each question
  const navigate = useNavigate();
 
  useEffect(() => {
    // Fetch assignment details from the backend (replace with your actual API call)
    const fetchAssignmentDetails = async () => {
      const fetchedAssignment2 = {
        id: 1,
        title: "Trigonometry",
        type: "mcq",
        subject: "Maths",
        questions: [
          { id: 1, question: "What is sin 30°?", options: ["0.5", "1", "0.866", "1.5"] },
          { id: 2, question: "What is cos 60°?", options: ["0.5", "1", "0.866", "1.5"] }
        ]
      };

      // Simulating the different assignment types:
      // fetchedAssignment1: file upload type
      // fetchedAssignment2: description type
      const fetchedAssignment1 = {
        id: 1,
        title: "Photosynthesis Process",
        type: "file upload",
        subject: "Biology",
        questions: [
          { id: 1, question: "Upload a diagram of the photosynthesis process.", options: [] },
          { id: 2, question: "Provide a PDF document explaining the steps involved in photosynthesis.", options: [] },
          { id: 1, question: "Upload a diagram of the photosynthesis process.", options: [] },
          { id: 2, question: "Provide a PDF document explaining the steps involved in photosynthesis.", options: [] },
        ]
      };

      const fetchedAssignment = {
        id: 1,
        title: "The Laws of Motion",
        type: "description",
        subject: "Physics",
        questions: [
          { id: 1, question: "Describe Newton's First Law of Motion.", options: [] },
          { id: 2, question: "Explain the concept of inertia.", options: [] },
          { id: 1, question: "Describe Newton's First Law of Motion.", options: [] },
          { id: 2, question: "Explain the concept of inertia.", options: [] },
        ]
      };

      // Use one of the assignments based on a condition for testing
      setAssignment(fetchedAssignment);
      setAssignment2(fetchedAssignment1) // Change to fetchedAssignment1 or fetchedAssignment2 for testing
    };

    fetchAssignmentDetails();
  }, [id]);

  const handleSubmit = () => {
    alert("Assignment submitted!");
    navigate("/"); 
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
          {assignment.questions.map((question) => (
            <div key={question.id} className="assignment-question">
              <p className="question-text">{question.question}</p>

              {/* Handling MCQ Type Question */}
              {assignment.type === "mcq" && (
                <div className="options">
                  {question.options.map((option, index) => (
                    <div key={index} className="option">
                      <input
                        type="radio"
                        id={`q${question.id}-option${index}`}
                        name={`question${question.id}`}
                        value={option}
                        onChange={(e) => handleInputChange(e, question.id)}
                      />
                      <label htmlFor={`q${question.id}-option${index}`} className="option-label">{option}</label>
                    </div>
                  ))}
                </div>
              )}

              {/* Handling Description Type Question */}
              {assignment.type === "description" && (
                <textarea
                  className="answer-input"
                  placeholder="Write your answer here..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputChange(e, question.id)}
                />
              )}

              {/* Handling File Upload Type Question */}
              {assignment.type === "file upload" && (
                <input
                  type="file"
                  className="file-input"
                  onChange={(e) => handleFileChange(e, question.id)}
                />
              )}
            </div>
          ))}
          
        </div>

        

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Assignment
        </button>
      </div>
    </div>
  );
};

export default AssignmentDetail;

import React, { useState } from 'react';
import './index.css';

function AssignmentForge() {
  const [selectedClass, setSelectedClass] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!selectedClass || !assignmentType || !topic) return alert("All fields are required");
    setLoading(true);

    const response = await fetch('http://localhost:8000/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        class: selectedClass,
        type: assignmentType,
        topic,
        description,
        count: questionCount
      })
    });

    const data = await response.json();
    setQuestions(data.questions || []);
    setLoading(false);
  };

  const regenerateOne = async (index) => {
    const response = await fetch('http://localhost:8000/regenerate-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        class: selectedClass,
        type: assignmentType,
        topic,
        description
      })
    });

    const data = await response.json();
    const updated = [...questions];
    updated[index] = data.question;
    setQuestions(updated);
  };

  const handleChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const sendAssignment = async () => {
    const response = await fetch('http://localhost:8000/send-assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        class: selectedClass,
        type: assignmentType,
        topic,
        description,
        questions
      })
    });

    if (response.ok) alert("Assignment sent to Hogwarts archive!");
    else alert("Oops, something went wrong.");
  };

  return (
    <div className="forge-container">
      <h1 className="forge-title">🧪 Assignment Forge</h1>

      <div className="form-row">
        <label>Class:</label>
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
          <option value="">Select</option>
          <option value="6">Class 6</option>
          <option value="7">Class 7</option>
          <option value="8">Class 8</option>
        </select>

        <label>Assignment Type:</label>
        <select value={assignmentType} onChange={e => setAssignmentType(e.target.value)}>
          <option value="">Select</option>
          <option value="MCQ">MCQ</option>
          <option value="Description">Descriptive</option>
          <option value="Upload">File Upload</option>
        </select>
      </div>

      <div className="form-column">
        <label>Topic:</label>
        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter the topic name..." />

        <label>Today's Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe today's lesson..." />

        <label>Number of Questions:</label>
        <input type="number" value={questionCount} onChange={e => setQuestionCount(e.target.value)} min="1" max="20" />

        <button className="action-button" onClick={generateQuestions}>
          {loading ? 'Summoning...' : 'Generate with AI'}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="questions-preview">
          <h2>📝 Preview & Edit Questions</h2>
          {questions.map((q, i) => (
            <div key={i} className="question-card">
              <textarea
                value={q.question}
                onChange={e => handleChange(i, e.target.value)}
              />
              <button onClick={() => regenerateOne(i)}>🔁 Regenerate</button>
            </div>
          ))}
          <button className="submit-button" onClick={sendAssignment}>📬 Send Assignment</button>
        </div>
      )}
    </div>
  );
}

export default AssignmentForge;

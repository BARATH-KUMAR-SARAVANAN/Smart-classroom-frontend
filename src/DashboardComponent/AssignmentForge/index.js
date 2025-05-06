import React, { useState } from 'react';
import './index.css';
import TeacherNavbar from '../../Components/TeacherNavbar';

function AssignmentForge() {
  const [selectedClass, setSelectedClass] = useState('');
  const [subject, setSubject] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState('');
  const [dueDate, setDueDate] = useState('');
  


  const formatGeneratedQuestion = (raw) => {
    if (typeof raw === "string") {
      raw = raw.replace(/```json|```/g, "").trim();
    }
    try {
      return JSON.parse(raw);  // <-- This return is critical
    } catch (err) {
      console.error("Failed to parse questions:", err);
      return []; // Optional: fallback in case of error
    }
  };
  
  const generateQuestions = async () => {
    if (!selectedClass || !assignmentType || !topic) return alert("All fields are required");
    setLoading(true);

    const response = await fetch('http://localhost:8000/teachers/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grade: selectedClass,
        type: assignmentType,
        topic,
        description,
        count: questionCount
      })
    });
    setLoading(false)
    const data = await response.json();
    const formatedData = formatGeneratedQuestion(data.questions)
    console.log(formatedData)
    setQuestions(formatedData);
  };

  // const regenerateOne = async (index) => {
  //   const response = await fetch('http://localhost:8000/teachers/generate-questions', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       grade: selectedClass,
  //       type: assignmentType,
  //       topic,
  //       description,
  //       count: 1
  //     })
  //   });

  //   const data = await response.json();
  //   const formatedData = formatGeneratedQuestion(data.questions)
  //   console.log("formateddata:",formatedData[0].question)
  //   const updated = [...questions];
  //   updated[index] = formatedData[0].question
  //   console.log("diff:",questions)
  //   console.log("new:",updated)
  //   //setQuestions(updated);
  // };

  const handleChange = (index, updatedQuestion) => {
    const updated = [...questions];
    updated[index] = updatedQuestion;
    console.log(updated)
    setQuestions(updated);
  };
  

  const sendAssignment = async () => {
    if (!selectedClass || !section || !dueDate) return alert("Fill class, section, and due date");
  
    const classRes = await fetch(`http://localhost:8000/teachers/get-class-id?grade=${selectedClass}&section=${section}`);
    const classData = await classRes.json();
    if (!classRes.ok) return alert(classData.detail || "Class not found");
    console.log(classData)
    // 🧠 Normalize question objects
    const formattedQuestions = questions.map(q => ({
      question_text: q.question,
      options: JSON.stringify(q.options),
      correct_answer: q.answer,
      marks: 1  // Set a default mark or make it dynamic if needed
    }));

    console.log(formattedQuestions)
  
    const response = await fetch('http://localhost:8000/teachers/send-assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        class_id: classData.class_id,
        assignment_type: assignmentType,
        title: topic,
        subject,
        description,
        due_date: dueDate,
        teacher_id: 1,
        questions: formattedQuestions
      })
    });
  
    if (response.ok) alert("Assignment sent to Hogwarts archive!");
    // else alert("Oops, something went wrong.");
  };
  

  return (
    <div className='assignmentforgepage'>
      <TeacherNavbar/>
      <div className="forge-container">
        <h1 className="forge-title">🧪 Assignment Forge</h1>

        <div className="form-row">
          <label>Class:</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
            <option value="">Select</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
          <label>Section:</label>
          <input type="text" value={section} onChange={e => setSection(e.target.value)} placeholder="e.g., A" />

          <label>Due Date:</label>
          <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />

          <label>Subject:</label>
          <select value={subject} onChange={e => setSubject(e.target.value)}>
            <option value="">Select</option>
            <option value="English">English</option>
            <option value="Maths">Maths</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>

          <label>Assignment Type:</label>
          <select value={assignmentType} onChange={e => setAssignmentType(e.target.value)}>
            <option value="">Select</option>
            <option value="mcq">MCQ</option>
            <option value="desc">Descriptive</option>
            <option value="prob">Mathmatical Problem</option>
            <option value="file">File Upload</option>
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
          <h2 className="forge-title-preview">📝 Preview & Edit Questions</h2>
          {questions.map((q, i) => (
            <div key={i} className="question-card">
              <textarea
                className="question-input"
                value={q.question}
                onChange={e => handleChange(i, { ...q, question: e.target.value })}
              />
        
            {assignmentType === "mcq" && (
              <div className="options-group">
                {q.options?.map((opt, j) => {
                  let className = "option-input"
                  if (opt === q.answer){
                    className = "option-input correct-option"
                  }
                  return(
                  <textarea
                    key={j}
                    type="text"
                    className={className}
                    value={opt}
                    onChange={e => {
                      const newOptions = [...q.options];
                      newOptions[j] = e.target.value;
                      handleChange(i, { ...q, options: newOptions });
                    }}>
                    </textarea>
                )})}
              </div>
        )}
      </div>
    ))}
    <button className="submit-button" onClick={sendAssignment}>📬 Send Assignment</button>
  </div>
)}

      </div>
    </div>
  );
}

export default AssignmentForge;

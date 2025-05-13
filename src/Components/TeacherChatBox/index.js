import React, { useState, useEffect } from 'react';
import ChatMessage from '../ChatMessage';
import './index.css';
import Navbar from '../Navbar';
import { v4 as uuidv4 } from 'uuid';

const TeacherChatBox = ({ role = 'student' }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    setSessionId(uuidv4()); // New session on refresh
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { message: input, sender: role }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: input,
          session_id: sessionId,
          role: role
        })
      });

      const data = await response.json();
      const reply = data.response;

      setMessages(prev => [...prev, { message: reply, sender: 'professor' }]);
    } catch (error) {
      console.error("Failed to fetch reply:", error);
    }
  };

  return (
    <div className='chatboxPageContainer'>
      <Navbar />
      <div className='chatboxBodyContainer'>
        <div className="chat-box">
          <div className="chat-header">📜 Chat with Hogwarts Professors</div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg.message} sender={msg.sender} />
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Ask your magical query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>🪄</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherChatBox;

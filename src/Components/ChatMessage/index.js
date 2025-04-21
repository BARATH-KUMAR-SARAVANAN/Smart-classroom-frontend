import React from 'react';
import './index.css';

const ChatMessage = ({ message, sender }) => {
  const isProfessor = sender === 'professor';

  return (
    <div className={`chat-message ${isProfessor ? 'professor' : 'student'}`}>
      <div className="chat-bubble">
        <p className="sender-name">{isProfessor ? '🧙 Professor' : '🧑 You'}</p>
        <p className="message-text">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

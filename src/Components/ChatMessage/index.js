import React from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';

const ChatMessage = ({ message, sender }) => {
  const isProfessor = sender === 'professor';

  return (
    <div className={`chat-message ${isProfessor ? 'professor' : 'student'}`}>
      <div className="chat-bubble">
        <p className="sender-name">{isProfessor ? '🧙🏻‍♂️ Professor' : '🧑🏻‍🦱 You'}</p>
        <p className="message-text"><ReactMarkdown>{message}</ReactMarkdown></p>
      </div>
    </div>
  );
};

export default ChatMessage;

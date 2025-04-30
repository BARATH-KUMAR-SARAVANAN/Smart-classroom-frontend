import React, { useState } from 'react';
import ChatMessage from '../ChatMessage';
import './index.css';
import Navbar from '../Navbar';
 
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { message: input, sender: 'student' }];
    setMessages(newMessages);
    setInput('');

    // Simulated professor reply (will be replaced with real API)
    setTimeout(() => {
      const replies = [
        "Ah, a curious question indeed!",
        "10 points to Gryffindor for that one!",
        "Let me consult the Book of Spells...",
        "Even Dumbledore would be impressed.",
        "Hmm... mischief managed!"
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, { message: reply, sender: 'professor' }]);
    }, 1000);
  };

  return (
    <div className='chatboxPageContainer'>
      <Navbar/>
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

export default ChatBox;

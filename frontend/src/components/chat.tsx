import React, { useEffect, useState, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Chat: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState('');
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => {
      // Close the EventSource when the component is unmounted
      if (esRef.current) esRef.current.close();
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (esRef.current) esRef.current.close();
    esRef.current = new EventSource(`http://localhost:3001/api/streamChat?prompt=${encodeURIComponent(inputValue)}`);
    
    esRef.current.onmessage = function (event) {
      const message = event.data;
      if (message === 'AIChatTermination20230514flexva') {
        if (esRef.current) esRef.current.close();
      } else {
        setMessages((prevMessages) => prevMessages + '\n' + message);
      }
    };

    esRef.current.onerror = function (event) {
      console.error("EventSource failed:", event);
      if (esRef.current) esRef.current.close();
    };
    // Clear the input field after submission
    setInputValue('');
  };

  return (
    <div className="container">
      <div className="logo">ChatGPT API Demo</div>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">
          <FaPaperPlane />
        </button>
      </form>
      <div className="chat-box">
        <div className="message-container">
          <p className="text-lg">{messages}</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;

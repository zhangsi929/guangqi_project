import React, { useState, useEffect} from 'react';
import { FaPaperPlane } from 'react-icons/fa';

import axios from 'axios';

const TextInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [returnedMessage, setReturnedMessage] = useState('');
  const [displayIndex, setDisplayIndex] = useState(0);
  const [messages, setMessages] = useState<Array<{ userMessage: string; assistantMessage: string }>>([]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
        // backend:3001/api/chat is used when running app in k8s cluster
        // when we in devleopment mode we use 'http://localhost:3001/api/chat'
        // give up running it in minikube, too lazy to cofig it. probaly need to use ingress
        // when in k8s cluster in production whe use 'http://backend:80/api/chat' this cannot be used, because the frontend is running in the browser and the browser cannot resolve the name backend
      
      
        //const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/chat' : 'http://ip/api/chat';

        // prod http://13.229.92.81:8080/api/chat
        // test http://localhost:3001/api/chat
      console.log('Submitting message:', inputValue); // log to console
      const response = await axios.post('http://13.229.92.81:443/api/chat', {
        message: inputValue,
      });
      console.log('Received response:', response); 
      setReturnedMessage(response.data.content);
      setDisplayIndex(0);
      setMessages((prevMessages) => [
        ...prevMessages,
        { userMessage: inputValue, assistantMessage: response.data.content },
      ]);
    } catch (error) {
      console.error('Error in handleSubmit:', error); 
    }
  };

  useEffect(() => {
    if (displayIndex < returnedMessage.length) {
      const timer = setTimeout(() => {
        setDisplayIndex(displayIndex + 1);
      }, 50); // 50ms this is the speed of the typing
  
      return () => clearTimeout(timer);
    }
  }, [returnedMessage, displayIndex]);

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="container">
      <div className="logo">ChatGPT API Demo</div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSubmit}>
            <FaPaperPlane />
        </button>
        <button onClick={handleClear} style={{ backgroundColor: "#1a73e8", marginLeft: "8px" }}>
          Clear
        </button>
      </div>
  
      <div className="chat-box">
        {messages.map((message, index) => {
          const isLatestMessage = index === messages.length - 1;
          return (
            <div className="message-container" key={index}>
              <p className="text-lg">
                <span>You:</span> {message.userMessage}
              </p>
              <p className="text-lg">
                <span>Assistant:</span>{' '}
                {isLatestMessage
                  ? message.assistantMessage.slice(0, displayIndex)
                  : message.assistantMessage}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
  
};

export default TextInput;
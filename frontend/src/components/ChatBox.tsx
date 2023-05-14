import React, { useEffect, useState, useRef } from 'react';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';

interface ChatBoxProps {
  inputValue: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ inputValue }) => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (esRef.current) esRef.current.close();
    esRef.current = new EventSource(`http://localhost:3001/api/streamChat?prompt=${encodeURIComponent(inputValue)}`);

    esRef.current.onmessage = function (event) {
      const message = event.data;
      if (message === 'AIChatTermination20230514flexva') {
        if (esRef.current) esRef.current.close();
      } else {
        setCurrentMessage((prevMessage) => prevMessage + '\n' + message);
      }
    };

    esRef.current.onerror = function (event) {
      console.error("EventSource failed:", event);
      if (esRef.current) esRef.current.close();
    };

    return () => {
      if (esRef.current) esRef.current.close();
    };
  }, [inputValue]);

  return (
    <div className="chatbox-message" style={{ marginBottom: '10px' }}>
      <div className="message-container">
        <p className="text-lg">{currentMessage}</p>
      </div>
    </div>
  );
};

export default ChatBox;

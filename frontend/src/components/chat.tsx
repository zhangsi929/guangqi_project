import React, { useEffect, useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const es = new EventSource('http://localhost:3001/api/streamChat');

    es.onmessage = function (event) {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      es.close();
    };
  }, []);

  return (
    <div>
      <h1>Response:</h1>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}

export default Chat;
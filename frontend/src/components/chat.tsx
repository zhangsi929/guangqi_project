import React, { useEffect, useState, useRef } from 'react';
import ChatBox from './ChatBox';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';
const Chat: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleClearMessages = () => {
        setMessages([]);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessages((prevMessages) => [...prevMessages, inputValue]);
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
                <button type="button" onClick={handleClearMessages}>
                    <FaTrash />
                </button>
            </form>
            {messages.slice(0).reverse().map((message, index) => (
        <ChatBox key={index} inputValue={message} />
      ))}
        </div>
    );
};

export default Chat;
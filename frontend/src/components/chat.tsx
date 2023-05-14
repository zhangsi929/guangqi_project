import React, { useEffect, useState, useRef } from 'react';
import ChatBox from './ChatBox';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';

const Chat: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="container">
            <div className="logo">ChatGPT API Demo</div>
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index} ref={index === messages.length - 1 ? messagesEndRef : null}>
                        <ChatBox inputValue={message} />
                    </div>
                ))}
            </div>
            <div className="input-group">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        value={inputValue}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <button type="submit">
                        <FaPaperPlane />
                    </button>
                    <button type="button" onClick={handleClearMessages}>
                        <FaTrash />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;

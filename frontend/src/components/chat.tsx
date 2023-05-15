import React, { useEffect, useState, useRef } from 'react';
import ChatBox from './ChatBox';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';

interface Message {
    show: string;
    text: string;
}
const Chat: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([{ show: 'bot', text: '你好 是谁 你有什么功能' }]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleClearMessages = () => {
        setMessages([]);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessages((prevMessages) => [...prevMessages, { show: 'user', text: inputValue }, { show: 'bot', text: inputValue }]);
        setInputValue('');
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="container">
            <div className="logo">ChatGPT 3.5 Turbo</div>
            <div className="chat-boxes-container">
                <div className="chat-box">
                    {messages.map((message, index) => (
                        <div key={index} ref={index === messages.length - 1 ? messagesEndRef : null}>
                            <ChatBox show={message.show} text={message.text} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="input-group">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="请输入..."
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

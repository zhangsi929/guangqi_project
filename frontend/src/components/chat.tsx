import React, { useEffect, useState, useRef } from 'react';
import ChatBox from './ChatBox';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';

const Chat: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const chatboxContainerRef = useRef<HTMLDivElement>(null);

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
        if (chatboxContainerRef.current) {
            chatboxContainerRef.current.scrollTop = chatboxContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>

            <div className="flex flex-col min-h-screen">
                <div className="container flex flex-col h-screen">
                    <div className="logo">ChatGPT API Demo</div>
                    <div className="flex-grow flex flex-col-reverse">
                        <div className="chatbox overflow-y-auto">
                            {messages.map((message, index) => (
                                <ChatBox key={index} inputValue={message} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 bg-gray-200 py-4 px-6">
                    <form onSubmit={handleSubmit} className="input-group absolute bottom-0">
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            value={inputValue}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <button type="submit" className="px-3 py-2 rounded-md bg-blue-500 text-white">
                            <FaPaperPlane />
                        </button>
                        <button type="button" onClick={handleClearMessages} className="px-3 py-2 rounded-md bg-red-500 text-white">
                            <FaTrash />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;

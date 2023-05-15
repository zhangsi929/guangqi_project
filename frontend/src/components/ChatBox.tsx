import React, { useEffect, useState, useRef } from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
// import { ReactComponent as UserIcon } from '../../public/hugging.png';
// import { ReactComponent as BotIcon } from '../../public/gpt.png';


interface ChatBoxProps {
    show: string;
    text: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ show, text }) => {
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const esRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (show === 'user') {
            setCurrentMessage(text);
            return
        }
        if (esRef.current) esRef.current.close();
        esRef.current = new EventSource(`http://localhost:3001/api/streamChat?prompt=${encodeURIComponent(text)}`);

        esRef.current.onmessage = function (event) {
            const message = event.data;
            if (message === 'AIChatTermination20230514flexva') {
                console.log('AIChatTermination20230514flexva');
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
    }, []);

    return (
        <div className="chatbox-message" style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
        {renderIcon()}
            <div className="message-container">
                <p className="text-lg">{currentMessage}</p>
            </div>
        </div>
    );
    
    function renderIcon() {
        if (show === 'user') {
            return <img src='/hugging.png' alt="User Icon" style={{ marginRight: '20px', width: '40px', height: '40px' }} />;
        } else if (show === 'bot') {
            return <img src='/gpt.png' alt="Bot Icon" style={{ marginRight: '20px', width: '40px', height: '40px' }} />;
        }
        return null;
    }
};

export default ChatBox;

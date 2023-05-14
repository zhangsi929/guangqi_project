import React, { useEffect, useState } from 'react';

function Chat() {
    const [messages, setMessages] = useState('');

    useEffect(() => {
        const es = new EventSource('http://localhost:3001/api/streamChat');

        es.onmessage = function (event) {
            const message = event.data;
            //   debugger
            if (message == 'AIChatTermination20230514flexva') {
                es.close();
            } else {
                setMessages(prevMessages => `${prevMessages} ${message}`);
            }
        };

        return () => {
            es.close();
        };
    }, []);

    return (
        <div>
            <h1>Response:</h1>
            {messages}
        </div>
    );
}

export default Chat;
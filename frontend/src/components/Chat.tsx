import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useMyContext } from '../MyContext';

const socket: Socket = io('http://localhost:3001');

interface Chat {
    text: string;
    username: string;
};

const Chat: React.FC = () => {
    const { username } = useMyContext(); // Get username from context
    const [body, setBody] = useState<string>('');
    const [messages, setMessages] = useState<Chat[]>([]);

    useEffect(() => {
        const handleMessage = (msg: Chat) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        };

        const initialMessages = (initialChats: Chat[]) => {
            setMessages(initialChats);
        };

        socket.on('initialMessages', initialMessages);
        socket.on('message', handleMessage);

        return () => {
            socket.off('message', handleMessage);
            socket.off('initialMessages', initialMessages);
        };
    }, []);

    useEffect(() => {
        if (!window.location.hash) {
          window.location.hash = '#loaded';
          window.location.reload();
        }
      }, []);

    const sendText = () => {
        if (body.trim() !== '') {
            socket.emit('message', { text: body, username });
            setBody('');
        }
    };

    return (
        <div>
            <h1>Chat:</h1>
            <input 
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}    
            />
            <button onClick={sendText}>Send</button>
            <div>
                <h1>List of Messages:</h1>
                <div>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <h3>{msg.username}:</h3>
                            <p>{msg.text}.</p>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chat;

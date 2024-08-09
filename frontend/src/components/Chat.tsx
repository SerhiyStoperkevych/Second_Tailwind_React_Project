import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useMyContext } from '../MyContext';

const socket: Socket = io('http://localhost:3001');

const Chat: React.FC = () => {
    const { username, setUsername } = useMyContext();
    const [body, setBody] = useState<string>('');
    const [allMessages, setAllMessages] = useState<{ text: string; username: string }[]>([]);
    const [userMessages, setUserMessages] = useState<{ text: string; username: string }[]>([]);

    useEffect(() => {
        // Check local storage for saved username
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }

        if (!username) {
            console.error("Username is not set");
            return;
        }

        const handleInitialMessages = (initialChats: { text: string; username: string }[]) => {
            setAllMessages(initialChats); // Set initial messages
        };

        const handleUserMessage = (msg: { text: string; username: string }) => {
            if (msg.username === username) {
                setUserMessages((prevMessages) => [...prevMessages, msg]);
            }
        };

        socket.on('initialMessages', handleInitialMessages);
        socket.on('userMessage', handleUserMessage);

        return () => {
            socket.off('initialMessages', handleInitialMessages);
            socket.off('userMessage', handleUserMessage);
        };
    }, [username]);

    const sendText = () => {
        if (body.trim() !== '' && username.trim() !== '') {
            socket.emit('message', { text: body, username });
            setBody('');
        } else {
            console.error('Message body or username is missing');
        }
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
        localStorage.setItem('username', newUsername);
    };

    return (
        <div className='flex flex-col bg-gray-100 items-center shadow-lg p-6 min-h-screen'>
            <h1 className='text-2xl font-bold mb-6'>Chat:</h1>
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <div className='flex items-center mb-4'>
                    <label className='font-bold mr-2'>Username:</label>
                    <input
                        type="text"
                        value={username || ''}
                        onChange={handleUsernameChange}
                        className='rounded-lg block focus:outline-none border focus:ring-2 focus:ring-blue-300 border-gray-300'
                        placeholder="Enter your username"
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col'>
                        {allMessages.map((msg, index) => (
                            <div key={index} className='bg-green-300 rounded-lg py-2 px-6 mb-4 text-left self-start'>
                                <p>{msg.username}:</p>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col'>
                        {userMessages.map((msg, index) => (
                            <div key={index} className='bg-blue-300 rounded-lg py-2 px-6 mb-4 text-right self-end'>
                                <p>{msg.username}:</p>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex justify-end mt-4'>
                    <button
                        onClick={sendText}                
                        className='border px-6 py-1 rounded-lg bg-blue-300 hover:bg-blue-500 hover:ring-2 hover:ring-blue-300 cursor-pointer'
                    >
                        Send
                    </button>
                    <input
                        type="text"
                        value={body}
                        className='rounded-lg block focus:outline-none border focus:ring-2 focus:ring-blue-300 border-gray-300 mr-2'
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
            </div>
        </div>



    );
};

export default Chat;

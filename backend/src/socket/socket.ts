import { Server } from "socket.io";
import Chat from '../models/chatModel';

const configureSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('User connected');

        // Emit initial messages when a new user connects
        Chat.find().then((chats) => {
            io.emit('initialMessages', chats);
        });

        socket.on('message', async (msg) => {
            console.log('Message received:', msg);

            // Create and save a new chat message with text and username
            const newChat = new Chat({
                text: msg.text,
                username: msg.username // Ensure username is included
            });

            try {
                await newChat.save();
                io.emit('message', newChat);
            } catch (error) {
                console.error('Error saving chat:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

export default configureSocket;

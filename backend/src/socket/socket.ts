import { Server } from "socket.io";
import Chat from '../models/chatModel';

const configureSocket = (io: Server) => {
    // Track users who have received initial messages
    const usersWhoReceivedInitialMessages = new Set<string>();

    io.on('connection', (socket) => {
        console.log('User connected');

        // Check if this user has already received initial messages
        if (!usersWhoReceivedInitialMessages.has(socket.id)) {
            Chat.find().then((chats) => {
                socket.emit('initialMessages', chats); // Emit only to this user
                usersWhoReceivedInitialMessages.add(socket.id); // Mark as received
            }).catch((error) => {
                console.error('Error fetching chats:', error);
            });
        }

        // Handle new message events
        socket.on('message', async (msg) => {
            console.log('Message received:', msg);

            // Create and save a new chat message with text and username
            const newChat = new Chat({
                text: msg.text,
                username: msg.username
            });

            try {
                await newChat.save();
                // Broadcast new message to all connected clients
                io.emit('message', newChat);
                // Broadcast new message to only the current user
                socket.emit('userMessage', newChat);
            } catch (error) {
                console.error('Error saving chat:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
            usersWhoReceivedInitialMessages.delete(socket.id); // Remove user from the set on disconnect
        });
    });
};

export default configureSocket;

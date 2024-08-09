import express from "express";
import http from 'http';
import connectDB from "./database";
import configureApp from "./app";
import configureSocket from "./socket/socket";
import { Server } from "socket.io";

const port = 3001;
const app = express();
const server = http.createServer(app);

connectDB();

configureApp(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

configureSocket(io);

server.listen(port, () => {
  console.log(`Local Host is running on http://localhost:${port}`);
});

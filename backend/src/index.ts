import express from "express";
import http from 'http';
import connectDB from "./database";
import configureApp from "./app";

const port = 3001;
const app = express();
const server = http.createServer(app);

connectDB();

configureApp(app);

server.listen(port, () => {
  console.log(`Local Host is running on http://localhost:${port}`)
  }
);
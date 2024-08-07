import express, { Express } from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';

const configureApp = (app: Express) => {
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/user', userRoute);
};

export default configureApp;

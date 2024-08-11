import express, { Express } from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';
import businessRoute from './routes/businessRoutes';
import reviewRoute from './routes/reviewRoutes';

const configureApp = (app: Express) => {
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/user', userRoute);
  app.use('/business', businessRoute);
  app.use('/review', reviewRoute);

};

export default configureApp;

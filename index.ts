import express from 'express';
import cors from 'cors';
import { photoRouter } from './src/routers/photo-router';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/photos', photoRouter);

export default app;

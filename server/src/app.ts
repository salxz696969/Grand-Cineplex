import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the TypeScript Express Server!' });
});

export default app;
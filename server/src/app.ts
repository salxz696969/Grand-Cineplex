import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { db } from './db';
import {movies} from "./db/schema/movies";

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', async (req: Request, res: Response) => {
   const result = await db.select().from(movies);
   res.json(result);
});

export default app;
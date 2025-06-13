import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import pool from "./utils/db";

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM movies', (err, result) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json("executed query");
    })
});

export default app;
import { Request, Response } from "express";
import { db } from "../db";
import { movies } from "../db/schema/movies";
import { eq } from "drizzle-orm";

const getAllMovies = async (req: Request, res: Response) => {
	try {
		const allMovies = await db.select().from(movies);
		res.json(allMovies).status(200);
	} catch (error) {
		res.json(error).status(404);
	}
};


const getMovieBasedOnId = async (req: Request, res: Response) => {
	try {
		const movieId = parseInt(req.params.id);
		const movieById = await db.select().from(movies).where(eq(movies.id, movieId));
		res.json(movieById).status(200);
	} catch (error) {
		res.json(error).status(404);
	}
};

export { getAllMovies, getMovieBasedOnId };

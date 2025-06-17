import { Request, Response } from "express";
import { db } from "../db";
import { movies } from "../db/schema/movies";
import { and, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { screenings } from "../db/schema/screenings";

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
		const movieById = await db
			.select()
			.from(movies)
			.where(eq(movies.id, movieId));
		res.json(movieById).status(200);
	} catch (error) {
		res.json(error).status(404);
	}
};

export const getComingSoonMovies = async (req: Request, res: Response) => {
	try {
		const today = new Date();
		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		const sixMonthsLater = new Date(
			today.getFullYear(),
			today.getMonth() + 6,
			1
		);

		const moviesComingInNext6Months = await db
			.select()
			.from(movies)
			.innerJoin(screenings, eq(movies.id, screenings.movieId))
			.where(
				and(
					gte(screenings.screeningDate, startOfMonth.toISOString()),
					lt(screenings.screeningDate, sixMonthsLater.toISOString())
				)
			);

		res.status(200).json(moviesComingInNext6Months);
	} catch (error) {
		res.json(error).status(404);
	}
};

export { getAllMovies, getMovieBasedOnId };

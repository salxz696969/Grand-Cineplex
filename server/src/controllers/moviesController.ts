import { Request, Response } from "express";
import { db } from "../db";
import { movies } from "../db/schema/movies";
import { and, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { screenings } from "../db/schema/screenings";

export const getAllMovies = async (req: Request, res: Response) => {
	try {
		const allMovies = await db.select().from(movies);
		res.json(allMovies).status(200);
	} catch (error) {
		res.json(error).status(404);
	}
};

export const getMovieBasedOnId = async (req: Request, res: Response) => {
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

export const addMovie = async (req: Request, res: Response) => {
	try {
		const { title, description, releaseDate, duration, genre, rating } =
			req.body;

		if (!title || !description || !releaseDate || !duration || !genre || !rating) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const newMovie = await db
			.insert(movies)
			.values({
				title,
				description,
				releaseDate,
				duration,
				genre,
				rating,
			})
			.returning();

		res.status(201).json(newMovie);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
}

export const updateMovie = async (req: Request, res: Response) => {
	try {
		const movieId = parseInt(req.params.id);
		const { title, description, releaseDate, duration, genre, rating } =
			req.body;

		if (!title || !description || !releaseDate || !duration || !genre || !rating) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const updatedMovie = await db
			.update(movies)
			.set({
				title,
				description,
				releaseDate,
				duration,
				genre,
				rating,
			})
			.where(eq(movies.id, movieId))
			.returning();

		if (updatedMovie.length === 0) {
			return res.status(404).json({ message: "Movie not found" });
		}

		res.status(200).json(updatedMovie[0]);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
}

export const deleteMovie = async (req: Request, res: Response) => {
	try {
		const movieId = parseInt(req.params.id);

		const deletedMovie = await db
			.delete(movies)
			.where(eq(movies.id, movieId))
			.returning();

		if (deletedMovie.length === 0) {
			return res.status(404).json({ message: "Movie not found" });
		}

		res.status(200).json({ message: "Movie deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};


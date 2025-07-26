import { Request, Response } from "express";
import Movie from "../../../db/models/Movie";
import Screening from "../../../db/models/Screening";
import { Op } from "sequelize";

export const getAllMovies = async (req: Request, res: Response) => {
	try {
		const allMovies = await Movie.findAll({
			order: [["title", "ASC"]],
		});
		res.status(200).json(allMovies);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const getMovieBasedOnId = async (req: Request, res: Response) => {
	try {
		const movieId = parseInt(req.params.id);
		const movie = await Movie.findByPk(movieId);

		if (!movie) {
			return res.status(404).json({ message: "Movie not found" });
		}

		res.status(200).json(movie);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
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

		const moviesComingInNext6Months = await Movie.findAll({
			include: [
				{
					model: Screening,
					as: "screenings",
					where: {
						screeningDate: {
							[Op.gte]: startOfMonth,
							[Op.lt]: sixMonthsLater,
						},
					},
					required: true,
				},
			],
			order: [["releaseDate", "ASC"]],
		});

		res.status(200).json(moviesComingInNext6Months);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const addMovie = async (req: Request, res: Response) => {
	try {
		const {
			title,
			description,
			releaseDate,
			duration,
			genre,
			posterUrl,
			trailerUrl,
      rating
		} = req.body;

		if (!title || !duration) {
			return res
				.status(400)
				.json({ message: "Title and duration are required" });
		}

		const newMovie = await Movie.create({
			title,
			description,
			releaseDate,
			duration: Number(duration),
			genre,
			posterUrl,
			trailerUrl,
      rating: Number(rating) || 7.5,
		});

		res.status(201).json(newMovie);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const updateMovie = async (req: Request, res: Response) => {
	try {
		const {
      id,
			title,
			description,
			releaseDate,
			duration,
			genre,
			posterUrl,
			trailerUrl,
      rating
		} = req.body;

		const movie = await Movie.findByPk(id);

		if (!movie) {
			return res.status(404).json({ message: "Movie not found" });
		}

    await movie.update({
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(releaseDate !== undefined && { releaseDate }),
      ...(duration !== undefined && { duration: Number(duration) }),
      ...(genre !== undefined && { genre }),
      ...(posterUrl !== undefined && { posterUrl }),
      ...(trailerUrl !== undefined && { trailerUrl }),
      ...(rating !== undefined && { rating }),
    });

		res.status(200).json(movie);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const deleteMovie = async (req: Request, res: Response) => {
	try {
		const movieId = parseInt(req.params.id);
		const movie = await Movie.findByPk(movieId);

		if (!movie) {
			return res.status(404).json({ message: "Movie not found" });
		}

		await movie.destroy();

		res.status(200).json({ message: "Movie deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

const recentlyAddedMovies = async () => {
	try {
		const today = new Date();
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(today.getDate() - 7);

		const movies = await Movie.findAll({
			where: {
				createdAt: {
					[Op.gte]: sevenDaysAgo,
				},
			},
			order: [["createdAt", "DESC"]],
			limit: 5,
		});

		return movies;
	} catch (error) {
		console.error("Error fetching recently added movies:", error);
		return [];
	}
};

export const getRecentlyAddedMovies = async (req: Request, res: Response) => {
	try {
		const movies = await recentlyAddedMovies();
		res.status(200).json(movies);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

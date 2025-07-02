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

export const getNowShowingMovies = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(today.getDate() - 20);

    const movies = await Movie.findAll({
      where: {
        release_date: {
          [Op.gte]: twentyDaysAgo,
          [Op.lte]: today,
        },
      },
      order: [["release_date", "DESC"]],
    });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUpcomingMovies = async (req: Request, res: Response) => {
  try {
    const today = new Date();

    const movies = await Movie.findAll({
      where: {
        release_date: {
          [Op.gt]: today,
        },
      },
      order: [["release_date", "ASC"]],
    });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTopRatedMovies = async (req: Request, res: Response) => {
  try {
    const topMovies = await Movie.findAll({
      where: {
        rating: {
          [Op.not]: null,
        },
      },
      order: [["rating", "DESC"]],
      limit: 5,
      attributes: ["id", "poster_url"],
    });

    res.status(200).json(topMovies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};


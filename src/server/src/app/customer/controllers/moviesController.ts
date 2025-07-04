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
    const { month, year } = req.query;

    let movies;

    // If month and year are provided, filter by that month
    if (month && year) {
      const monthNum = parseInt(month as string);
      const yearNum = parseInt(year as string);

      if (isNaN(monthNum) || isNaN(yearNum)) {
        return res.status(400).json({ message: "Invalid month or year format" });
      }

      // Minus it one because to make it match with js, since js count from zero
      const startDate = new Date(yearNum, monthNum - 1, 1);
      const endDate = new Date(yearNum, monthNum, 0, 23, 59, 59, 999);

      // It filter the start day in target month to the end of the day
      movies = await Movie.findAll({
        where: {
          release_date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["release_date", "ASC"]],
      });
    } else { 
      // Find all movies where the release_date is greater than right now
      
      const today = new Date();

      movies = await Movie.findAll({
        where: {
          release_date: {
            [Op.gt]: today,
          },
        },
        order: [["release_date", "ASC"]],
      });
    }

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};




// export const getTopRatedMovies = async (req: Request, res: Response) => {
//   try {
//     const topMovies = await Movie.findAll({
//       where: {
//         rating: {
//           [Op.not]: null,
//         },
//       },
//       order: [["rating", "DESC"]],
//       limit: 5,
//       attributes: ["id", "poster_url"],
//     });

//     res.status(200).json(topMovies);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };


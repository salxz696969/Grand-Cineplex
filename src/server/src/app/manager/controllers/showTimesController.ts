import { Request, Response } from "express";
import Screening from "../../../db/models/Screening";
import { Op, Sequelize } from "sequelize";

export const get7DaysShowTimes = async (req: Request, res: Response) => {
	try {
		const today = new Date();
		const next5Days = [];
		for (let i = 0; i < 6; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			next5Days.push(date.toISOString().split("T")[0]);
		}

		const showTimeForToday = await Screening.findAll({
			where: {
				screeningDate: {
					[Op.in]: next5Days,
				},
			},
			include: [
				{
					association: "movie",
					attributes: ["id", "title", "duration", "genre"],
				},
				{
					association: "theater",
					attributes: ["id", "name"],
				},
			],
			order: [
				["screeningDate", "ASC"],
				["screeningTime", "ASC"],
			],
		});

		res.status(200).json(showTimeForToday);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const getTodayShowTimes = async (req: Request, res: Response) => {
	try {
		const today = new Date();
		const showTimeForToday = await Screening.findAll({
			where: {
				screeningDate: {
					[Op.eq]: today.toISOString().split("T")[0],
				},
			},
			include: [
				{
					association: "movie",
					attributes: [
						"id",
						"title",
						"duration",
						"genre",
						"posterUrl",
					],
				},
				{
					association: "theater",
					attributes: {
						include: [
							[
								Sequelize.literal(`(
								SELECT COUNT(*)
								FROM seats AS seat
								WHERE seat.theater_id = theater.id
							)`),
								"seatCount",
							],
						],
						exclude: [],
					},
				},
			],
			order: [
				["screeningDate", "ASC"],
				["screeningTime", "ASC"],
			],
		});
		const formatData = showTimeForToday.map((data: any) => {
			const screeningDate = data.screeningDate;
			const screeningTime = data.screeningTime;
			const now = new Date();
			const screeningDateTime = new Date(
				`${screeningDate}T${screeningTime}`
			);
			let status: "upcoming" | "ongoing" | "completed" = "upcoming";
			const durationMinutes = data.movie?.duration || 0;
			const endDateTime = new Date(
				screeningDateTime.getTime() + durationMinutes * 60000
			);

			if (now < screeningDateTime) {
				status = "upcoming";
			} else if (now >= screeningDateTime && now <= endDateTime) {
				status = "ongoing";
			} else {
				status = "completed";
			}

      return {
        id: data.id,
        movieTitle: data.movie?.title,
        movieImage: data.movie?.posterUrl,
        theater: data.theater?.name,
        date: screeningDate,
        time: screeningTime.slice(0, 5),
        duration: String(data.movie?.duration) + " min",
        availableSeats: Number(data.theater?.seatCount) || 100,
        totalSeats: Number(data.theater?.seatCount) || 50,
        price: Number(data.price),
        status,
      };
		});
		res.json(formatData);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const getAllShowTimes = async (req: Request, res: Response) => {
	try {
		const allShowTimes = await Screening.findAll({
			include: [
				{
					association: "movie",
					attributes: [
						"id",
						"title",
						"duration",
						"genre",
						"posterUrl",
					],
				},
				{
					association: "theater",
					attributes: {
						include: [
							[
								Sequelize.literal(`(
								SELECT COUNT(*)
								FROM seats AS seat
								WHERE seat.theater_id = theater.id
							)`),
								"seatCount",
							],
						],
						exclude: [],
					},
				},
			],
			order: [
				["screeningDate", "ASC"],
				["screeningTime", "ASC"],
			],
		});
		const formatData = allShowTimes.map((data: any) => {
			const screeningDate = data.screeningDate;
			const screeningTime = data.screeningTime;
			const now = new Date();
			const screeningDateTime = new Date(
				`${screeningDate}T${screeningTime}`
			);
			let status: "upcoming" | "ongoing" | "completed" = "upcoming";
			const durationMinutes = data.movie?.duration || 0;
			const endDateTime = new Date(
				screeningDateTime.getTime() + durationMinutes * 60000
			);

			if (now < screeningDateTime) {
				status = "upcoming";
			} else if (now >= screeningDateTime && now <= endDateTime) {
				status = "ongoing";
			} else {
				status = "completed";
			}

      return {
        id: data.id,
        movieTitle: data.movie?.title,
        movieImage: data.movie?.posterUrl,
        theater: data.theater?.name,
        date: screeningDate,
        time: screeningTime.slice(0, 5),
        duration: String(data.movie?.duration) + " min",
        availableSeats: Number(data.theater?.seatCount) || 100,
        totalSeats: Number(data.theater?.seatCount) || 50,
        price: Number(data.price),
        status,
      };
		});
		res.json(formatData);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const getShowTimesBasedOnMovieId = async (
	req: Request,
	res: Response
) => {
	try {
		const movieId = parseInt(req.params.id);
		const showTimesForMovie = await Screening.findAll({
			where: { movieId },
			include: [
				{
					association: "theater",
					attributes: ["id", "name"],
				},
			],
			order: [
				["screeningDate", "ASC"],
				["screeningTime", "ASC"],
			],
		});
		res.status(200).json(showTimesForMovie);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const addShowTime = async (req: Request, res: Response) => {
	try {
		const { movieId, theaterId, screeningDate, screeningTime, price } =
			req.body;

		if (
			!movieId ||
			!theaterId ||
			!screeningDate ||
			!screeningTime ||
			!price
		) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const newShowTime = await Screening.create({
			movieId,
			theaterId,
			screeningDate,
			screeningTime,
			price,
		});

		res.status(201).json(newShowTime);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const updateShowTime = async (req: Request, res: Response) => {
	try {
		const showTimeId = parseInt(req.params.id);
		const { movieId, theaterId, screeningDate, screeningTime, price } =
			req.body;

		if (
			!movieId ||
			!theaterId ||
			!screeningDate ||
			!screeningTime ||
			!price
		) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const showTime = await Screening.findByPk(showTimeId);

		if (!showTime) {
			return res.status(404).json({ message: "Show time not found" });
		}

		await showTime.update({
			movieId,
			theaterId,
			screeningDate,
			screeningTime,
			price,
		});

		res.status(200).json(showTime);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const deleteShowTime = async (req: Request, res: Response) => {
	try {
		const showTimeId = parseInt(req.params.id);

		const showTime = await Screening.findByPk(showTimeId);

		if (!showTime) {
			return res.status(404).json({ message: "Show time not found" });
		}

		await showTime.destroy();

		res.status(200).json({ message: "Show time deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

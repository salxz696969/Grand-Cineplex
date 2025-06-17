import { Request, Response } from "express";
import { db } from "../db";
import { screenings } from "../db/schema/screenings";
import { eq, inArray } from "drizzle-orm";

export const getTodayShowTimes = async (req: Request, res: Response) => {
	try {
        const today = new Date();
		const next5Days = [];
		for (let i = 0; i < 6; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			next5Days.push(date.toLocaleDateString().split("T")[0]);
		}
		console.log(next5Days);
		const showTimeForToday = await db
			.select()
			.from(screenings)
			.where(inArray(screenings.screeningDate, next5Days));
		res.json(showTimeForToday).status(200);
	} catch (error) {
		res.json(error).status(404);
	}
};

export const getAllShowTimes = async (req: Request, res: Response) => {
	try {
		const allShowTimes = await db.select().from(screenings);
		res.json(allShowTimes).status(200);
	} catch (error) {
		res.json(error).status(404);
	}
};

export const getShowTimesBasedOnMovieId = async (
	req: Request,
	res: Response
) => {
	try {
		const movieId = parseInt(req.params.id);
		const showTimesForMovie = await db
			.select()
			.from(screenings)
			.where(eq(screenings.movieId, movieId));
		res.json(showTimesForMovie).status(200);
	} catch (error) {
		res.json(error).status(404);
	}
};

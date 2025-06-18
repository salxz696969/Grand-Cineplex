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

export const addShowTime = async (req: Request, res: Response) => {
    try {
        const { movieId, theaterId, screeningDate, screeningTime, price } = req.body;
		const createdAt = new Date();
		if (!movieId || !theaterId || !screeningDate || !screeningTime) {
			return res.status(400).json({ message: "Invalid input" });
		}
		const newShowTime = await db
			.insert(screenings)
			.values({ movieId, theaterId, screeningDate, screeningTime, price, createdAt })
			.returning();
		res.status(201).json(newShowTime);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const updateShowTime = async (req: Request, res: Response) => {
    try {
        const showTimeId = parseInt(req.params.id);
        const { movieId, theaterId, screeningDate, screeningTime, price } = req.body;
        const updatedAt = new Date();
        if (!movieId || !theaterId || !screeningDate || !screeningTime) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const updatedShowTime = await db
            .update(screenings)
            .set({ movieId, theaterId, screeningDate, screeningTime, price, updatedAt })
            .where(eq(screenings.id, showTimeId))
            .returning();
        res.status(200).json(updatedShowTime);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const deleteShowTime = async (req: Request, res: Response) => {
    try {
        const showTimeId = parseInt(req.params.id);
        const deletedShowTime = await db
            .delete(screenings)
            .where(eq(screenings.id, showTimeId))
            .returning();
        if (deletedShowTime.length === 0) {
            return res.status(404).json({ message: "Show time not found" });
        }
        res.status(200).json(deletedShowTime[0]);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}   
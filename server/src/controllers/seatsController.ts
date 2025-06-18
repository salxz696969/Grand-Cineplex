import { Request, Response } from "express";
import { db } from "../db";
import { seats } from "../db/schema/seats";
import { theaters } from "../db/schema/theaters";
import { eq } from "drizzle-orm";
import { screenings } from "../db/schema/screenings";
import { tickets } from "../db/schema/tickets";
import { bookings } from "../db/schema/bookings";

export const getAllSeatsBasedOnShowTime = async (
	req: Request,
	res: Response
) => {
	try {
		const showTimeId = parseInt(req.params.id);
		const seatsFromAShowTime = await db
			.select()
			.from(seats)
			.innerJoin(theaters, eq(seats.theaterId, theaters.id))
			.innerJoin(screenings, eq(screenings.theaterId, theaters.id))
			.where(eq(screenings.id, showTimeId));
		const seatsFromTicketsDb = await db
			.select({ seatId: tickets.seatId })
			.from(tickets)
			.innerJoin(bookings, eq(tickets.bookingId, bookings.id))
			.innerJoin(screenings, eq(bookings.screeningId, screenings.id))
			.where(eq(screenings.id, showTimeId));
		const availableSeats = seatsFromAShowTime.filter(
			(seat) =>
				seatsFromTicketsDb
					.map((ticket) => ticket.seatId)
					.includes(seat.seats.id) === false
		);
		res.status(200).json(availableSeats);
	} catch (error) {
		res.json(error).status(404);
	}
};

export const addSeat = async (req: Request, res: Response) => {
	try {
		const { seatNumber, theaterId, rowNumber } = req.body;
		if (!seatNumber || !theaterId || !rowNumber) {
			return res.status(400).json({ message: "Invalid input" });
		}
		const newSeat = await db
			.insert(seats)
			.values({ seatNumber, theaterId, rowNumber })
			.returning();
		res.status(201).json(newSeat);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const updateSeat = async (req: Request, res: Response) => {
	try {
		const seatId = parseInt(req.params.id);
		const { seatNumber, rowNumber, seatType } = req.body;
		if (!seatNumber || !rowNumber) {
			return res.status(400).json({ message: "Invalid input" });
		}
		const updatedSeat = await db
			.update(seats)
			.set({ seatNumber, rowNumber, seatType })
			.where(eq(seats.id, seatId))
			.returning();
		res.status(200).json(updatedSeat);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const deleteSeat = async (req: Request, res: Response) => {
	try {
		const seatId = parseInt(req.params.id);
		const deletedSeat = await db
			.delete(seats)
			.where(eq(seats.id, seatId))
			.returning();
		if (deletedSeat.length === 0) {
			return res.status(404).json({ message: "Seat not found" });
		}
		res.status(200).json(deletedSeat);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

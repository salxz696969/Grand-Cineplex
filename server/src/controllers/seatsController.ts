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

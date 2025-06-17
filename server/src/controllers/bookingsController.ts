import { eq } from "drizzle-orm";
import { db } from "../db";
import { bookings } from "../db/schema/bookings";
import { Request, Response } from "express";

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

export const getAllBookingsForUser = async (req:Request, res:Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const bookingsInfo = await db
            .select()
            .from(bookings)
            .where(eq(bookings.customerId, userId));
        res.status(200).json(bookingsInfo);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const getBookingBasedOnId = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const bookingId = parseInt(req.params.id);
        const bookingInfo = await db
            .select()
            .from(bookings)
            .where(eq(bookings.id, bookingId));
        if (bookingInfo.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(bookingInfo[0]);
    } catch (error) {
        res.status(404).json(error);
    }
}
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

export const addBookingByStaff = async (req: Request, res: Response) => {   
    try {
        //TODO the userId should be staff
        const userId=req.user?.id;
        const { customerId, screeningId, status } = req.body;
        if (!customerId || !screeningId || !status ) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const createdAt = new Date();
        const newBooking = await db
            .insert(bookings)
            .values({ customerId, screeningId, status, createdAt, createdByStaffId: userId })
            .returning();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const updateBookingByStaff = async (req: Request, res: Response) => {
    try {
        const bookingId = parseInt(req.params.id);
        const { customerId, screeningId, status } = req.body;
        if (!customerId || !screeningId || !status) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const updatedAt = new Date();
        const updatedBooking = await db
            .update(bookings)
            .set({ customerId, screeningId, status, updatedAt })
            .where(eq(bookings.id, bookingId))
            .returning();
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const deleteBookingByStaff = async (req: Request, res: Response) => {
    try {
        //TODO the userId should be staff
        const userId=req.user?.id;
        const bookingId = parseInt(req.params.id);
        const deletedBooking = await db
            .delete(bookings)
            .where(eq(bookings.id, bookingId))
            .returning();
        if (deletedBooking.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(deletedBooking[0]);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
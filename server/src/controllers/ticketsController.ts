import { eq } from "drizzle-orm";
import { db } from "../db";
import { tickets } from "../db/schema/tickets";
import { Request, Response } from "express";

export const addTicket = async (req: Request, res: Response) => {
    try {
        const { bookingIdString, ticketType, seatId } = req.body;
        const bookingId = parseInt(bookingIdString);
        const createdAt = new Date()
        if (!bookingId || !ticketType || !seatId) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const newTicket = await db
            .insert(tickets)
            .values({ bookingId, ticketType, seatId, createdAt })
            .returning();

        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const getAllTickets= async (req: Request, res: Response) => {
    try {
        const allTickets = await db.select().from(tickets);
        res.status(200).json(allTickets);
    } catch (error) {
        res.status(404).json({ message: "Tickets not found", error });
    }
}

export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const ticketId = parseInt(req.params.id);
        const deletedTicket = await db
            .delete(tickets)
            .where(eq(tickets.id, ticketId))
            .returning();

        if (deletedTicket.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(deletedTicket[0]);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const updateTicket = async (req: Request, res: Response) => {
    try {
        const ticketId = parseInt(req.params.id);
        const { bookingIdString, ticketType, seatId } = req.body;
        const bookingId = parseInt(bookingIdString);
        
        if (!bookingId || !ticketType || !seatId) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const updatedTicket = await db
            .update(tickets)
            .set({ bookingId, ticketType, seatId })
            .where(eq(tickets.id, ticketId))
            .returning();

        if (updatedTicket.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(updatedTicket[0]);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const getTicketBasedOnId = async (req: Request, res: Response) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const ticketsForBooking = await db
            .select()
            .from(tickets)
            .where(eq(tickets.bookingId, bookingId));

        if (ticketsForBooking.length === 0) {
            return res.status(404).json({ message: "No tickets found for this booking" });
        }

        res.status(200).json(ticketsForBooking);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
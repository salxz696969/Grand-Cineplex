import { Request, Response } from "express";
import Booking from "../../../db/models/Booking";
import Customer from "../../../db/models/Customer";
import Seat from "../../../db/models/Seat";
import Ticket from "../../../db/models/Ticket";
import Screening from "../../../db/models/Screening";
import Movie from "../../../db/models/Movie";
import Theater from "../../../db/models/Theater";

export const getBookingBasedOnId = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId))
      return res.status(400).json({ message: "Invalid booking ID" });

    const booking = await Booking.findOne({
      where: { id: bookingId },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["name", "phone"],
        },
        {
          model: Screening,
          as: "screening",
          include: [
            {
              model: Movie,
              as: "movie",
              attributes: ["title"],
            },
            {
              model: Theater,
              as: "theater",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Ticket,
          as: "tickets",
          include: [
            {
              model: Seat,
              as: "seat",
              attributes: ["seatNumber", "price"],
            },
          ],
        },
      ],
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const b: any = booking;

    const seats =
      b.tickets?.map((ticket: any) => ({
        seatNumber: ticket.seat?.seatNumber,
        price: ticket.seat?.price || 0,
      })) || [];

    const totalAmount = seats.reduce((sum: number, s: any) => sum + s.price, 0);

    const summary = {
      movieTitle: b.screening?.movie?.title || "",
      theater: b.screening?.theater?.name || "",
      date: b.screening?.screeningDate || "",
      time: b.screening?.screeningTime || "",
      seats,
      totalAmount,
      customerName: b.customer?.name || "",
      customerPhone: b.customer?.phone || "",
      screeningId: b.screening?.id || null,
    };

    return res.status(200).json(summary);
  } catch (error) {
    console.error("getBookingBasedOnId error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create booking for authenticated user
export const createBooking = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || !user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please log in to book." });
    }

    const { screening_id, seat_ids, status = "pending" } = req.body;

    if (!screening_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
      return res
        .status(400)
        .json({ message: "screening_id and seat_ids are required" });
    }

    // Use user.id directly as customer_id
    const booking = await Booking.create({
      screeningId: screening_id,
      customerId: user.id,
      status,
    });

    await Promise.all(
      seat_ids.map((seat_id: number) =>
        Ticket.create({
          bookingId: booking.id,
          seatId: seat_id,
        })
      )
    );

    return res.status(201).json({ id: booking.id });
  } catch (error) {
    console.error("createBooking error:", error);
    return res.status(500).json({ message: "Booking failed" });
  }
};

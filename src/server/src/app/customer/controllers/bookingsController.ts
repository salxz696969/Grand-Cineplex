import { Request, Response } from "express";
import Booking from "../../../db/models/Booking";
import Customer from "../../../db/models/Customer";
import Seat from "../../../db/models/Seat";
import Ticket from "../../../db/models/Ticket";
import Screening from "../../../db/models/Screening";
import Movie from "../../../db/models/Movie";
import Theater from "../../../db/models/Theater";


//  Fetch booking detail base on booking ID, only use it in payment summary page
export const getBookingBasedOnId = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) return res.status(400).json({ message: "Invalid booking ID" });

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
              attributes: ["seat_number", "price"],
            },
          ],
        },
      ],
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const b: any = booking;

    const seats = b.tickets?.map((ticket: any) => ({
      seat_number: ticket.seat?.seat_number,
      price: ticket.seat?.price || 0,
    })) || [];

    const totalAmount = seats.reduce((sum: number, s: any) => sum + s.price, 0);

    const summary = {
      movieTitle: b.screening?.movie?.title || "",
      theater: b.screening?.theater?.name || "",
      date: b.screening?.screening_date || "",
      time: b.screening?.screening_time || "",
      seats,
      totalAmount,
      customerName: b.customer?.name || "",
      customerPhone: b.customer?.phone || "",
      screeningId: b.screening?.id || null,
    };

    return res.status(200).json(summary);
  } catch (error) {
    console.error("getBookingBasedOnId error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const createBooking = async (req: Request, res: Response) => {
  try {
    const { screening_id, seat_ids, customer, status = "pending" } = req.body;

    if (!screening_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
      return res.status(400).json({ message: "screening_id and seat_ids are required" });
    }

    let customer_id: number | null = null;

    if (customer && customer.id) {
      customer_id = customer.id;
    } else if (customer && customer.name && customer.phone) {
      const newCustomer = await Customer.create({
        name: customer.name,
        phone: customer.phone,
      });
      customer_id = newCustomer.id;
    }

    const booking = await Booking.create({
      screening_id,
      customer_id,
      status,
    });

    await Promise.all(
      seat_ids.map((seat_id: number) =>
        Ticket.create({
          booking_id: booking.id,
          seat_id,
        })
      )
    );

    res.status(201).json({ id: booking.id });
  } catch (error) {
    console.error("createBooking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};


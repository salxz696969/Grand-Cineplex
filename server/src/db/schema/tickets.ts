import {
  pgTable,
  serial,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { seats } from "./seats";

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  seatId: integer("seat_id")
    .notNull()
    .references(() => seats.id),
  ticketType: varchar("ticket_type", { length: 20 }).default("adult"),
  createdAt: timestamp("created_at").defaultNow(),
});

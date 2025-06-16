import {
  pgTable,
  serial,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { screenings } from "./screenings";
import { staff } from "./staff";

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "reserved",
  "confirmed",
  "cancelled",
  "refunded",
]);

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => customers.id),
  screeningId: integer("screening_id")
    .notNull()
    .references(() => screenings.id),
  status: bookingStatusEnum("status").default("pending"),
  createdByStaffId: integer("created_by_staff_id").references(() => staff.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

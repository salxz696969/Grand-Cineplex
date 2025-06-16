import {
  pgTable,
  serial,
  integer,
  timestamp,
  decimal,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { bookings } from "./bookings";

export const paymentTypeEnum = pgEnum("payment_type", [
  "cash",
  "card",
  "digital_wallet",
  "bank_transfer",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookings.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  method: paymentTypeEnum("method").notNull(),
  status: paymentStatusEnum("status").default("pending"),
  transactionReference: varchar("transaction_reference", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

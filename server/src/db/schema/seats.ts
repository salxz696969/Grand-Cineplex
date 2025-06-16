import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { theaters } from "./theaters";

export const seatTypeEnum = pgEnum("seat_type", ["regular", "premium", "vip"]);

export const seats = pgTable("seats", {
  id: serial("id").primaryKey(),
  theaterId: integer("theater_id")
    .notNull()
    .references(() => theaters.id),
  rowNumber: varchar("row_number", { length: 5 }).notNull(),
  seatNumber: integer("seat_number").notNull(),
  seatType: seatTypeEnum("seat_type").default("regular"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

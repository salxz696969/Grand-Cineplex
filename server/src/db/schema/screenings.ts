import {
  pgTable,
  serial,
  integer,
  timestamp,
  date,
  time,
  decimal,
} from "drizzle-orm/pg-core";
import { movies } from "./movies";
import { theaters } from "./theaters";

export const screenings = pgTable("screenings", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id")
    .notNull()
    .references(() => movies.id),
  theaterId: integer("theater_id")
    .notNull()
    .references(() => theaters.id),
  screeningDate: date("screening_date").notNull(),
  screeningTime: time("screening_time").notNull(),
  price: decimal("price", { precision: 8, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

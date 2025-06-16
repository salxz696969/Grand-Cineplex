import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  duration: integer("duration").notNull(), // in minutes
  genre: varchar("genre", { length: 100 }),
  rating: varchar("rating", { length: 10 }),
  posterUrl: text("poster_url"),
  releaseDate: date("release_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const theaters = pgTable("theaters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

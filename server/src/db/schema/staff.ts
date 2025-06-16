import {
  pgTable,
  serial,
  varchar,
  timestamp,
  date,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const staffRoleEnum = pgEnum("staff_role", [
  "cashier",
  "admin",
  "manager",
]);

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: staffRoleEnum("role").notNull(),
  phone: varchar("phone", { length: 20 }),
  hiredDate: date("hired_date"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

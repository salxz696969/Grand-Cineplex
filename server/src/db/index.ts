import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as moviesSchema from "./schema/movies";
import * as theatersSchema from "./schema/theaters";
import * as seatsSchema from "./schema/seats";
import * as screeningsSchema from "./schema/screenings";
import * as customersSchema from "./schema/customers";
import * as staffSchema from "./schema/staff";
import * as bookingsSchema from "./schema/bookings";
import * as ticketsSchema from "./schema/tickets";
import * as paymentsSchema from "./schema/payments";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    ...moviesSchema,
    ...theatersSchema,
    ...seatsSchema,
    ...screeningsSchema,
    ...customersSchema,
    ...staffSchema,
    ...bookingsSchema,
    ...ticketsSchema,
    ...paymentsSchema,
  },
});

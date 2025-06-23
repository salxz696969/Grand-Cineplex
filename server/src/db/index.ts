import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

// Import models for associations
import Movie, { initMovie } from "./models/Movie";
import Theater, { initTheater } from "./models/Theater";
import Seat, { initSeat } from "./models/Seat";
import Screening, { initScreening } from "./models/Screening";
import Customer, { initCustomer } from "./models/Customer";
import Staff, { initStaff } from "./models/Staff";
import Booking, { initBooking } from "./models/Booking";
import Ticket, { initTicket } from "./models/Ticket";
import Payment, { initPayment } from "./models/Payment";

// Define associations
const setupAssociations = () => {
  // Theater associations
  Theater.hasMany(Seat, { foreignKey: "theaterId", as: "seats" });
  Theater.hasMany(Screening, { foreignKey: "theaterId", as: "screenings" });

  // Movie associations
  Movie.hasMany(Screening, { foreignKey: "movieId", as: "screenings" });

  // Seat associations
  Seat.belongsTo(Theater, { foreignKey: "theaterId", as: "theater" });
  Seat.hasMany(Ticket, { foreignKey: "seatId", as: "tickets" });

  // Screening associations
  Screening.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });
  Screening.belongsTo(Theater, { foreignKey: "theaterId", as: "theater" });
  Screening.hasMany(Booking, { foreignKey: "screeningId", as: "bookings" });

  // Customer associations
  Customer.hasMany(Booking, { foreignKey: "customerId", as: "bookings" });

  // Staff associations
  Staff.hasMany(Booking, {
    foreignKey: "createdByStaffId",
    as: "createdBookings",
  });

  // Booking associations
  Booking.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
  Booking.belongsTo(Screening, { foreignKey: "screeningId", as: "screening" });
  Booking.belongsTo(Staff, {
    foreignKey: "createdByStaffId",
    as: "createdByStaff",
  });
  Booking.hasMany(Ticket, { foreignKey: "bookingId", as: "tickets" });
  Booking.hasMany(Payment, { foreignKey: "bookingId", as: "payments" });

  // Ticket associations
  Ticket.belongsTo(Booking, { foreignKey: "bookingId", as: "booking" });
  Ticket.belongsTo(Seat, { foreignKey: "seatId", as: "seat" });

  // Payment associations
  Payment.belongsTo(Booking, { foreignKey: "bookingId", as: "booking" });
};

// Initialize models and associations
const initializeDatabase = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Initialize models first
    initMovie(sequelize);
    initTheater(sequelize);
    initSeat(sequelize);
    initScreening(sequelize);
    initCustomer(sequelize);
    initStaff(sequelize);
    initBooking(sequelize);
    initTicket(sequelize);
    initPayment(sequelize);

    // Setup associations
    setupAssociations();

    // Sync models with database (in development)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("Database synchronized.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, initializeDatabase };
export default sequelize;

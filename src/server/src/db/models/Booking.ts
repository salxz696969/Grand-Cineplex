import { Model, DataTypes, Sequelize } from "sequelize";

// Define booking status enum
export enum BookingStatus {
  PENDING = "pending",
  RESERVED = "reserved",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

class Booking extends Model {
  declare id: number;
  declare customer_id: number | null;
  declare screening_id: number;
  declare status: BookingStatus;
  declare created_by_staff_id: number | null;
  declare created_at: Date;
  declare updated_at: Date;

  // Custom instance methods
  isConfirmed(): boolean {
    return this.status === BookingStatus.CONFIRMED;
  }

  isCancelled(): boolean {
    return (
      this.status === BookingStatus.CANCELLED ||
      this.status === BookingStatus.REFUNDED
    );
  }

  canBeCancelled(): boolean {
    return (
      this.status === BookingStatus.PENDING ||
      this.status === BookingStatus.RESERVED ||
      this.status === BookingStatus.CONFIRMED
    );
  }

  // Static methods
  static async findWithDetails(booking_id: number) {
    return this.findByPk(booking_id, {
      include: [
        {
          association: "customer",
          attributes: ["id", "name", "email", "phone"],
        },
        {
          association: "screening",
          include: [
            {
              association: "movie",
              attributes: ["id", "title", "duration", "genre"],
            },
            {
              association: "theater",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          association: "createdByStaff",
          attributes: ["id", "name", "role"],
        },
        {
          association: "tickets",
          include: [
            {
              association: "seat",
              attributes: ["row_number", "seat_number", "seat_type"],
            },
          ],
        },
        {
          association: "payments",
          attributes: ["id", "amount", "method", "status", "created_at"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }

  static async findByCustomer(customer_id: number) {
    return this.findAll({
      where: { customer_id },
      include: [
        {
          association: "screening",
          include: [
            {
              association: "movie",
              attributes: ["id", "title", "duration"],
            },
            {
              association: "theater",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          association: "tickets",
          include: [
            {
              association: "seat",
              attributes: ["row_number", "seat_number"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }

  static async findByScreening(screening_id: number) {
    return this.findAll({
      where: { screening_id },
      include: [
        {
          association: "customer",
          attributes: ["id", "name", "email"],
        },
        {
          association: "tickets",
          include: [
            {
              association: "seat",
              attributes: ["row_number", "seat_number"],
            },
          ],
        },
      ],
      order: [["created_at", "ASC"]],
    });
  }

  static async findPending() {
    return this.findAll({
      where: { status: BookingStatus.PENDING },
      include: [
        {
          association: "customer",
          attributes: ["id", "name", "email"],
        },
        {
          association: "screening",
          include: [
            {
              association: "movie",
              attributes: ["id", "title"],
            },
          ],
        },
      ],
      order: [["created_at", "ASC"]],
    });
  }
}

export const initBooking = (sequelize: Sequelize) => {
  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "customers",
          key: "id",
        },
      },
      screening_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "screenings",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM(...Object.values(BookingStatus)),
        allowNull: false,
        defaultValue: BookingStatus.PENDING,
      },
      created_by_staff_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "staff",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "bookings",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Booking;

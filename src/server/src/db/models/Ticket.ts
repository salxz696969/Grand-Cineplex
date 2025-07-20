import { Model, DataTypes, Sequelize } from "sequelize";

class Ticket extends Model {
  declare id: number;
  declare bookingId: number;
  declare seatId: number;
  // declare ticketType: string;
  declare createdAt: Date;

  // Custom instance methods
  getTicketNumber(): string {
    return `TKT-${this.id.toString().padStart(6, "0")}`;
  }

  // Static methods
  static async findByBooking(booking_id: number) {
    return this.findAll({
      where: { booking_id },
      include: [
        {
          association: "seat",
          attributes: ["row_number", "seat_number", "seat_type"],
        },
      ],
      order: [["created_at", "ASC"]],
    });
  }

  static async findWithDetails(ticket_id: number) {
    return this.findByPk(ticket_id, {
      include: [
        {
          association: "booking",
          include: [
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
              association: "customer",
              attributes: ["id", "name", "email"],
            },
          ],
        },
        {
          association: "seat",
          attributes: ["row_number", "seat_number", "seat_type"],
        },
      ],
    });
  }

  static async findForScreening(screening_id: number) {
    return this.findAll({
      include: [
        {
          association: "booking",
          where: { screening_id },
          attributes: ["id", "status"],
        },
        {
          association: "seat",
          attributes: ["id", "row_number", "seat_number", "seat_type"],
        },
      ],
      order: [["created_at", "ASC"]],
    });
  }
}

export const initTicket = (sequelize: Sequelize) => {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "bookings",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "seats",
          key: "id",
        },
      },
      // ticketType: {
      //   type: DataTypes.STRING(20),
      //   allowNull: false,
      //   defaultValue: "adult",
      // },
    },
    {
      sequelize,
      tableName: "tickets",
      timestamps: true,
      underscored: true,
      createdAt: true,
      updatedAt: false, // Tickets don't need updatedAt
    }
  );
};

export default Ticket;

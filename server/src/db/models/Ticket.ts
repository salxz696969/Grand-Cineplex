import { Model, DataTypes, Sequelize } from "sequelize";

class Ticket extends Model {
  declare id: number;
  declare bookingId: number;
  declare seatId: number;
  declare ticketType: string;
  declare createdAt: Date;

  // Custom instance methods
  getTicketNumber(): string {
    return `TKT-${this.id.toString().padStart(6, "0")}`;
  }

  // Static methods
  static async findByBooking(bookingId: number) {
    return this.findAll({
      where: { bookingId },
      include: [
        {
          association: "seat",
          attributes: ["rowNumber", "seatNumber", "seatType"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  }

  static async findWithDetails(ticketId: number) {
    return this.findByPk(ticketId, {
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
          attributes: ["rowNumber", "seatNumber", "seatType"],
        },
      ],
    });
  }

  static async findForScreening(screeningId: number) {
    return this.findAll({
      include: [
        {
          association: "booking",
          where: { screeningId },
          attributes: ["id", "status"],
        },
        {
          association: "seat",
          attributes: ["id", "rowNumber", "seatNumber", "seatType"],
        },
      ],
      order: [["createdAt", "ASC"]],
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
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "bookings",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      seatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "seats",
          key: "id",
        },
      },
      ticketType: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "adult",
      },
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

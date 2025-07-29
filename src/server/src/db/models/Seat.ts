import { Model, DataTypes, Sequelize } from "sequelize";

// Define seat type enum
export enum SeatType {
  REGULAR = "regular",
  PREMIUM = "premium",
  VIP = "vip",
}

class Seat extends Model {
  declare id: number;
  declare theaterId: number;
  declare rowNumber: string;
  declare seatNumber: number;
  declare seatType: SeatType;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Custom instance methods
  getSeatLabel(): string {
    return `${this.rowNumber}${this.seatNumber}`;
  }

  isPremium(): boolean {
    return this.seatType === SeatType.PREMIUM || this.seatType === SeatType.VIP;
  }

  // Static methods
  static async findByTheater(theaterId: number) {
    return this.findAll({
      where: { theaterId },
      order: [
        ["rowNumber", "ASC"],
        ["seatNumber", "ASC"],
      ],
    });
  }

  static async findAvailableSeats(screeningId: number) {
    return this.findAll({
      include: [
        {
          association: "theater",
          attributes: ["id", "name"],
        },
      ],
      where: {
        "$tickets.booking.screening_id$": screeningId,
      },
      order: [
        ["rowNumber", "ASC"],
        ["seatNumber", "ASC"],
      ],
    });
  }
}

export const initSeat = (sequelize: Sequelize) => {
  Seat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      theaterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "theater_id",
        references: {
          model: "theaters",
          key: "id",
        },
      },
      rowNumber: {
        type: DataTypes.STRING(5),
        allowNull: false,
        field: "row_number",
      },
      seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "seat_number",
      },
      seatType: {
        type: DataTypes.ENUM(...Object.values(SeatType)),
        allowNull: false,
        defaultValue: SeatType.REGULAR,
        field: "seat_type",
      },
    },
    {
      sequelize,
      tableName: "seats",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Seat;

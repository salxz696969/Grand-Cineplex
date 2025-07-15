import { Model, DataTypes, Sequelize } from "sequelize";

// Define seat type enum
export enum SeatType {
  REGULAR = "regular",
  PREMIUM = "premium",
  VIP = "vip",
}

class Seat extends Model {
  declare id: number;
  declare theater_id: number;
  declare row_number: string;
  declare seat_number: number;
  declare seat_type: SeatType;
  declare price: number;
  declare created_at: Date;
  declare updated_at: Date;

  // Custom instance methods
  getSeatLabel(): string {
    return `${this.row_number}${this.seat_number}`;
  }

  isPremium(): boolean {
    return this.seat_type === SeatType.PREMIUM || this.seat_type === SeatType.VIP;
  }

  // Static methods
  static async findByTheater(theater_id: number) {
    return this.findAll({
      where: { theater_id },
      order: [
        ["row_number", "ASC"],
        ["seat_number", "ASC"],
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
        ["row_number", "ASC"],
        ["seat_number", "ASC"],
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
      theater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "theaters",
          key: "id",
        },
      },
      row_number: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      seat_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seat_type: {
        type: DataTypes.ENUM(...Object.values(SeatType)),
        allowNull: false,
        defaultValue: SeatType.REGULAR,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

import { Model, DataTypes, Op, Sequelize } from "sequelize";

class Screening extends Model {
  declare id: number;
  declare movie_id: number;
  declare theater_id: number;
  declare screening_date: Date;
  declare screening_time: string;
  declare price: number;
  declare created_at: Date;
  declare updated_at: Date;

  // Custom instance methods
  getFormattedDateTime(): string {
    const date = new Date(this.screening_date);
    const time = this.screening_time;
    return `${date.toLocaleDateString()} at ${time}`;
  }

  getFullDateTime(): Date {
    const date = new Date(this.screening_date);
    const [hours, minutes] = this.screening_time.split(":");
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date;
  }

  // Static methods
  static async findUpcoming() {
    return this.findAll({
      where: {
        screening_date: {
          [Op.gte]: new Date(),
        },
      },
      include: [
        {
          association: "movie",
          attributes: ["id", "title", "duration", "genre", "rating"],
        },
        {
          association: "theater",
          attributes: ["id", "name"],
        },
      ],
      order: [
        ["screening_date", "ASC"],
        ["screening_time", "ASC"],
      ],
    });
  }

  static async findByMovie(movie_id: number) {
    return this.findAll({
      where: { movie_id },
      include: [
        {
          association: "theater",
          attributes: ["id", "name"],
        },
      ],
      order: [
        ["screening_date", "ASC"],
        ["screening_time", "ASC"],
      ],
    });
  }

  static async findByTheater(theater_id: number) {
    return this.findAll({
      where: { theater_id },
      include: [
        {
          association: "movie",
          attributes: ["id", "title", "duration", "genre", "rating"],
        },
      ],
      order: [
        ["screening_date", "ASC"],
        ["screening_time", "ASC"],
      ],
    });
  }
}

export const initScreening = (sequelize: Sequelize) => {
  Screening.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "movie",
          key: "id",
        },
      },
      theater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "theaters",
          key: "id",
        },
      },
      screening_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      screening_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "screenings",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Screening;

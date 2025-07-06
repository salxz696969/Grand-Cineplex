import { Model, DataTypes, Sequelize } from "sequelize";

export enum TheaterStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  MAINTENANCE = "maintenance",
}

class Theater extends Model {
  declare id: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare status: TheaterStatus;

  // Static methods
  static async findWithSeats() {
    return this.findAll({
      include: [
        {
          association: "seats",
          attributes: ["id", "rowNumber", "seatNumber", "seatType"],
        },
      ],
      order: [["name", "ASC"]],
    });
  }

  static async findWithScreenings() {
    return this.findAll({
      include: [
        {
          association: "screenings",
          include: [
            {
              association: "movie",
              attributes: ["id", "title", "duration"],
            },
          ],
          order: [
            ["screeningDate", "ASC"],
            ["screeningTime", "ASC"],
          ],
        },
      ],
      order: [["name", "ASC"]],
    });
  }
}

export const initTheater = (sequelize: Sequelize) => {
  Theater.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status:{
        type: DataTypes.ENUM(
          TheaterStatus.ACTIVE,
          TheaterStatus.INACTIVE,
          TheaterStatus.MAINTENANCE
        ),
        defaultValue: TheaterStatus.ACTIVE,
      }
    },
    {
      sequelize,
      tableName: "theaters",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Theater;

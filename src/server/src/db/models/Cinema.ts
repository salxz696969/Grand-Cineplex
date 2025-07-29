import { Model, DataTypes, Sequelize } from "sequelize";

class Cinema extends Model {
  declare id: number;
  declare name: string;
  declare address: string | null;
  declare city: string | null;
  declare state: string | null;
  declare country: string | null;
  declare phone: string | null;
  declare email: string | null;
  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Custom instance methods
  getFullAddress(): string {
    const parts = [this.address, this.city, this.state, this.country].filter(
      Boolean
    );
    return parts.join(", ");
  }

  // Static methods
  static async findActive() {
    return this.findAll({
      where: { isActive: true },
      order: [["name", "ASC"]],
    });
  }

  static async findByCity(city: string) {
    return this.findAll({
      where: { city, isActive: true },
      order: [["name", "ASC"]],
    });
  }

  static async findWithTheaters() {
    return this.findAll({
      include: [
        {
          association: "theaters",
          attributes: ["id", "name"],
        },
      ],
      where: { isActive: true },
      order: [["name", "ASC"]],
    });
  }
}

export const initCinema = (sequelize: Sequelize) => {
  Cinema.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active",
      },
    },
    {
      sequelize,
      tableName: "cinemas",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Cinema;

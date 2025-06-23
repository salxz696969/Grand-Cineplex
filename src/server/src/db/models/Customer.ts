import { Model, DataTypes, Sequelize } from "sequelize";

class Customer extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare phone: string | null;
  declare password: string;
  declare dateOfBirth: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Custom instance methods
  getAge(): number | null {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  // Static methods
  static async findByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }

  static async findWithBookings(customerId: number) {
    return this.findByPk(customerId, {
      include: [
        {
          association: "bookings",
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
                  attributes: ["rowNumber", "seatNumber", "seatType"],
                },
              ],
            },
          ],
          order: [["createdAt", "DESC"]],
        },
      ],
    });
  }
}

export const initCustomer = (sequelize: Sequelize) => {
  Customer.init(
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
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "customers",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Customer;

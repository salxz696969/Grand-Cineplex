import { Model, DataTypes, Sequelize } from "sequelize";

class Customer extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare phone: string | null;
  declare password: string;
  declare date_of_birth: Date | null;
  declare created_at: Date;
  declare updated_at: Date;

  // Custom instance methods
  getAge(): number | null {
    if (!this.date_of_birth) return null;
    const today = new Date();
    const birthDate = new Date(this.date_of_birth);
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

  static async findWithBookings(customer_id: number) {
    return this.findByPk(customer_id, {
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
                  attributes: ["row_number", "seat_number", "seat_type"],
                },
              ],
            },
          ],
          order: [["created_at", "DESC"]],
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
      date_of_birth: {
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

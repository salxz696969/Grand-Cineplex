import { Model, DataTypes, Op, Sequelize } from "sequelize";

// Define payment type enum
export enum PaymentType {
  CASH = "cash",
  CARD = "card",
  DIGITAL_WALLET = "digital_wallet",
  BANK_TRANSFER = "bank_transfer",
}

// Define payment status enum
export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

class Payment extends Model {
  declare id: number;
  declare booking_id: number;
  declare amount: number;
  declare method: PaymentType;
  declare status: PaymentStatus;
  declare transaction_reference: string | null;
  declare created_at: Date;
  declare updated_at: Date;

  // Custom instance methods
  isCompleted(): boolean {
    return this.status === PaymentStatus.COMPLETED;
  }

  isPending(): boolean {
    return this.status === PaymentStatus.PENDING;
  }

  isFailed(): boolean {
    return this.status === PaymentStatus.FAILED;
  }

  isRefunded(): boolean {
    return this.status === PaymentStatus.REFUNDED;
  }

  getFormattedAmount(): string {
    return `$${this.amount.toFixed(2)}`;
  }

  // Static methods
  static async findByBooking(booking_id: number) {
    return this.findAll({
      where: { booking_id },
      order: [["created_at", "DESC"]],
    });
  }

  static async findCompleted() {
    return this.findAll({
      where: { status: PaymentStatus.COMPLETED },
      include: [
        {
          association: "booking",
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
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }

  static async findPending() {
    return this.findAll({
      where: { status: PaymentStatus.PENDING },
      include: [
        {
          association: "booking",
          include: [
            {
              association: "customer",
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
      order: [["created_at", "ASC"]],
    });
  }

  static async getTotalRevenue(startDate?: Date, endDate?: Date) {
    const whereClause: any = { status: PaymentStatus.COMPLETED };

    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [startDate, endDate],
      };
    }

    const result = await this.sum("amount", { where: whereClause });
    return result || 0;
  }
}

export const initPayment = (sequelize: Sequelize) => {
  Payment.init(
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
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      method: {
        type: DataTypes.ENUM(...Object.values(PaymentType)),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        allowNull: false,
        defaultValue: PaymentStatus.PENDING,
      },
      transaction_reference: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "payments",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Payment;

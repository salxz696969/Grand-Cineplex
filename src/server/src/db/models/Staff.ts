import { Model, DataTypes, Sequelize } from "sequelize";

// Define staff role enum
export enum StaffRole {
  CASHIER = "cashier",
  ADMIN = "admin",
  MANAGER = "manager",
}

class Staff extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: StaffRole;
  declare phone: string | null;
  declare hiredDate: Date | null;
  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Custom instance methods
  isManager(): boolean {
    return this.role === StaffRole.MANAGER;
  }

  isAdmin(): boolean {
    return this.role === StaffRole.ADMIN;
  }

  isCashier(): boolean {
    return this.role === StaffRole.CASHIER;
  }

  canManageStaff(): boolean {
    return this.role === StaffRole.ADMIN || this.role === StaffRole.MANAGER;
  }

  // Static methods
  static async findByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }

  static async findActive() {
    return this.findAll({
      where: { isActive: true },
      order: [["name", "ASC"]],
    });
  }

  static async findByRole(role: StaffRole) {
    return this.findAll({
      where: { role, isActive: true },
      order: [["name", "ASC"]],
    });
  }

  static async findCashiers() {
    return this.findByRole(StaffRole.CASHIER);
  }

  static async findManagers() {
    return this.findAll({
      where: {
        role: [StaffRole.MANAGER, StaffRole.ADMIN],
        isActive: true,
      },
      order: [["name", "ASC"]],
    });
  }
}

export const initStaff = (sequelize: Sequelize) => {
  Staff.init(
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
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(StaffRole)),
        allowNull: false,
        defaultValue: StaffRole.CASHIER,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      hiredDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "hired_date",
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
      tableName: "staff",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Staff;

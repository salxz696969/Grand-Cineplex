import { Model, DataTypes, Op, Sequelize } from "sequelize";

class Movie extends Model {
  declare id: number;
  declare title: string;
  declare description: string | null;
  declare duration: number;
  declare genre: string | null;
  declare rating: number | null;
  declare poster_url: string | null;
  declare trailer_url: string | null;
  declare release_date: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Custom instance methods
  getFormattedDuration(): string {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return `${hours}h ${minutes}m`;
  }

  // Static methods
  static async findUpcoming() {
    return this.findAll({
      where: {
        release_date: {
          [Op.gte]: new Date(),
        },
      },
      order: [["release_date", "ASC"]],
    });
  }

  static async findByGenre(genre: string) {
    return this.findAll({
      where: { genre },
      order: [["title", "ASC"]],
    });
  }
}

// This will be called from the main index file
export const initMovie = (sequelize: Sequelize) => {
  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Duration in minutes",
      },
      genre: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      poster_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      trailer_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "movie",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Movie;

import { Model, DataTypes, Op, Sequelize } from "sequelize";

class Movie extends Model {
  declare id: number;
  declare title: string;
  declare description: string | null;
  declare duration: number;
  declare genre: string | null;
  declare rating: number | null;
  declare posterUrl: string | null;
  declare trailerUrl: string | null;
  declare releaseDate: Date | null;
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
        releaseDate: {
          [Op.gte]: new Date(),
        },
      },
      order: [["releaseDate", "ASC"]],
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
      posterUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "poster_url",
      },
      trailerUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "trailer_url",
      },
      releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "release_date",
      },
    },
    {
      sequelize,
      tableName: "movies",
      timestamps: true,
      underscored: true,
    }
  );
};

export default Movie;

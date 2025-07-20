import Theater from "../../../db/models/Theater";
import Seat from "../../../db/models/Seat";
import { Request, Response } from "express";
import { fn, col } from "sequelize";

export const getTheaters = async (req: Request, res: Response) => {
  try {
    const theaters = await Theater.findAll({
      attributes: [
        "id",
        "name",
        "status",
        [fn("COUNT", col("seats.id")), "capacity"],
      ],
      include: [
        {
          model: Seat,
          as: "seats",
          attributes: [],
        },
      ],
      group: ["Theater.id"],
      order: [["status", "ASC"]],
    });

    const formatted = theaters.map((theater: any) => {
      const plain = theater.get ? theater.get({ plain: true }) : theater;
      return {
        id: plain.id,
        name: plain.name,
        capacity: Number(plain.capacity),
        rows: Math.ceil(Number(plain.capacity) / 10), // Assuming 10 seats per row
        seatsPerRow: 10,
        status: plain.status,
      };
    });

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const addTheater = async (req: Request, res: Response) => {
  try {
    const {
      name,
      status,
      cinemaId,
    }: { name: string; status: string; cinemaId: string | number } = req.body;

    if (!name || !status || !cinemaId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTheater = await Theater.create({
      name,
      status,
      cinemaId: Number(cinemaId),
    });

    return res.status(201).json(newTheater);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

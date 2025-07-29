import { getAllSeatsBasedOnShowTime } from "../app/manager/controllers/seatsController";
import Seat from "../db/models/Seat";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../db/models/Seat");

describe("Seats Controller", () => {
  it("should return all seats", async () => {
    (Seat.findAll as jest.Mock).mockResolvedValue([
      { id: 1, rowNumber: "A", seatNumber: 1 },
    ] as never);
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getAllSeatsBasedOnShowTime(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, rowNumber: "A", seatNumber: 1 },
    ]);
  });
});

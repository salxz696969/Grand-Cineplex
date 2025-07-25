import { getAllBookings } from "../app/manager/controllers/bookingsController";
import Booking from "../db/models/Booking";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../db/models/Booking");

describe("Booking Controller", () => {
  it("should return all bookings", async () => {
    (Booking.findAll as jest.Mock).mockResolvedValue([{ id: 1 }] as never);
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getAllBookings(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });
});

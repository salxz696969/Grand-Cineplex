import { getAllTickets } from "../app/manager/controllers/ticketsController";
import Ticket from "../db/models/Ticket";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../db/models/Ticket");

describe("Tickets Controller", () => {
  it("should return all tickets", async () => {
    (Ticket.findAll as jest.Mock).mockResolvedValue([
      { id: 1, seatId: 1 },
    ] as never);
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getAllTickets(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, seatId: 1 }]);
  });
});

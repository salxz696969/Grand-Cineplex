import { getAllShowTimes } from "../app/manager/controllers/screeningController";
import Screening from "../db/models/Screening";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../db/models/Screening");

describe("Screening Controller", () => {
  it("should return all screenings", async () => {
    (Screening.findAll as jest.Mock).mockResolvedValue([{ id: 1, movieId: 1 }] as never);
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getAllShowTimes(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, movieId: 1 }]);
  });
});

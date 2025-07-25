import { getTheaters } from "../app/manager/controllers/theatersController";
import Theater from "../db/models/Theater";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../db/models/Theater");

describe("Theaters Controller", () => {
  it("should return all theaters", async () => {
    (Theater.findAll as jest.Mock).mockResolvedValue([
      { id: 1, name: "Main Hall" },
    ] as never);
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getTheaters(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Main Hall" }]);
  });
});

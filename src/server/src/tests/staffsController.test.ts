import { getAllStaff } from "../app/manager/controllers/staffsController";
import Staff from "../db/models/Staff";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../db/models/Staff");

describe("Staffs Controller", () => {
  it("should return all staffs", async () => {
    (Staff.findAll as jest.Mock).mockResolvedValue([
      { id: 1, name: "Alice" },
    ] as never);
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getAllStaff(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Alice" }]);
  });
});

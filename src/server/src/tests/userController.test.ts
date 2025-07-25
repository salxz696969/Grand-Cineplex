import { getUserInfo } from "../app/manager/controllers/userController";
import Customer from "../db/models/Customer";

jest.mock("../db/models/Customer");

describe("User Controller", () => {
  it("should return all users", async () => {
    (Customer.findByPk as jest.Mock).mockResolvedValue([
      { id: 1, username: "testuser" },
    ]);
    const req = { user: { id: 1 } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getUserInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, username: "testuser" }]);
  });
});

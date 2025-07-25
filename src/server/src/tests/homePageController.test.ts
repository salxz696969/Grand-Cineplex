import { getInfoForHomePage } from "../app/manager/controllers/homePageController";
import Movie from "../db/models/Movie";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../db/models/Movie");

describe("HomePage Controller", () => {
  it("should return home page movies", async () => {
    (Movie.findAll as jest.Mock).mockResolvedValue([
      { id: 1, title: "Home Movie" },
    ] as never);
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getInfoForHomePage(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: "Home Movie" }]);
  });
});

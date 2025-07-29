import { getAllMovies } from "../app/manager/controllers/moviesController";
import Movie from "../db/models/Movie";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../db/models/Movie");

describe("Movie Controller", () => {
  it("should return all movies", async () => {
    (Movie.findAll as jest.Mock).mockResolvedValue([{ id: 1, title: "Test" }] as never);
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    await getAllMovies(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: "Test" }]);
  });
});

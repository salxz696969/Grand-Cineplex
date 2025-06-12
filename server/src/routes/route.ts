import express, { Request, Response } from "express";
const route=express.Router()

route.post("/search")
route.get("/movie")
route.post("/movie/:id")
route.get("/showtime")
route.post("/theatre")
route.post("/theatre/seat")

export default route
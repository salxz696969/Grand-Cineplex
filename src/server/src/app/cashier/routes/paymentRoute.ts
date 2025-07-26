import express from "express";
import {
  createKhqrPayment,
  checkPaymentStatus,
} from "../controllers/paymentController";

const route = express.Router();

route.post("/qr-code", createKhqrPayment);
route.get("/status/:tranId", checkPaymentStatus);

export default route;

import express from "express";
import {
  createKhqrPayment,
  checkPaymentStatus,
} from "../controllers/paymentController";
import authMiddlewareCashier from "../../../middleware/authMiddlewareCashier";

const route = express.Router();
route.use(authMiddlewareCashier)

route.post("/qr-code", createKhqrPayment);
route.get("/status/:tranId", checkPaymentStatus);

export default route;

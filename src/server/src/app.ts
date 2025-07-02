import express from "express";
import cors from "cors";
import customerRoute from "./app/customer/routes/index";
import cashierRoute from "./app/cashier/routes/index";
import managerRoute from "./app/manager/routes/index";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/customer", customerRoute);
app.use("/cashier", cashierRoute);
app.use("/manager", managerRoute);

export default app;

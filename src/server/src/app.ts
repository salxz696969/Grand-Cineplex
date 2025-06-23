import express from "express";
import customerRoute from "./app/customer/routes/index";
import cashierRoute from "./app/cashier/routes/index";
import managerRoute from "./app/manager/routes/index";

const app = express();

// Middleware
app.use(express.json());

// Customer routes
app.use("/customer", customerRoute);

// Cashier routes
app.use("/cashier", cashierRoute);

// Manager routes
app.use("/manager", managerRoute);

export default app;

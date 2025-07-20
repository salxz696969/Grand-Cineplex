import express from "express";
import customerRoute from "./app/customer/routes/index";
import cashierRoute from "./app/cashier/routes/index";
import managerRoute from "./app/manager/routes/index";
import cors from "cors";

const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173", // Adjust this to your frontend URL
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true, // Allow cookies to be sent with requests
    }
))

app.options("*", cors());
// Middleware
app.use(express.json());

// Customer routes
app.use("/customer", customerRoute);

// Cashier routes
app.use("/cashier", cashierRoute);

// Manager routes
app.use("/manager", managerRoute);



export default app;

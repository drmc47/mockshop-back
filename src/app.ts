import express, { Request, Response } from "express";
import logger from "morgan";
import * as path from "path";
import cors from "cors";
import { login, register } from "./controllers/auth";
import { getAllProducts } from "./controllers/products";
import { createOrder, getUserOrders } from "./controllers/orders";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());

app.use(logger("dev"));
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin",
        ],
    }),
);
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
});
//Authentication
app.post("/login", login);
app.post("/register", register);

//Products
app.get("/products", getAllProducts);

//Orders
app.post("/orders", createOrder);
app.get("/orders/:userId", getUserOrders);

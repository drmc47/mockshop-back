import { Request, Response } from "express";
import User from "../models/User";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
    const { userId, products, total } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        const newOrder = new Order({
            userId,
            products,
            total,
            status: "complete",
        });
        await newOrder.save();
        return res.send(newOrder);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
};

export const getUserOrders = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        const orders = await Order.find({ userId });
        return res.send(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
};

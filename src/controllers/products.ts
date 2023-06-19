import axios from "axios";
import { Request, Response } from "express";

export const getAllProducts = async (_req: Request, res: Response) => {
    const products = await axios.get("https://fakestoreapi.com/products");
    res.send(products.data);
};

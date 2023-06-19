import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const login = async (req: Request, res: Response) => {
    console.log("BODYYYY", req.body);
    const { username, password } = req.body;
    // compare the username and password with the database
    // if the username and password are correct, send the user data
    if (!username || !password) {
        res.status(400).send("Username and password are required");
        return;
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).send("User not found");
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).send("Invalid credentials");
            return;
        }
        return res.send(user);
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, password, name } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).send("Username already taken");
            return;
        }
        const newUser = new User({ username, password, name });
        await newUser.save();
        return res.send(newUser);
    } catch (error) {
        console.log("ERROR", error);
        return res.status(500).send("Internal server error");
    }
};

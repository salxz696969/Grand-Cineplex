import { eq } from "drizzle-orm";
import { Response, Request } from "express";
import { db } from "../db";
import { customers } from "../db/schema/customers";
import bcrypt from "bcryptjs";

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

export const getUserInfo = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const userInfo = await db
			.select()
			.from(customers)
			.where(eq(customers.id, userId));
		if (userInfo.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(userInfo[0]);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { name, email, phone, password, dateOfBirth } = req.body;
        if (!name || !email || !phone || !dateOfBirth || (password && password.length < 6)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let hashedPassword = password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }
        const updatedAt = new Date();
        const updatedUser = await db
            .update(customers)
            .set({ name, email, phone, password: hashedPassword, dateOfBirth, updatedAt })
            .where(eq(customers.id, userId))
            .returning();
        if (updatedUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser[0]);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password, dateOfBirth } = req.body;
        if (!name || !email || !phone || !dateOfBirth || (password && password.length < 6)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let hashedPassword = password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }
        const createdAt = new Date();
        const newUser = await db
            .insert(customers)
            .values({ name, email, phone, password: hashedPassword, dateOfBirth, createdAt })
            .returning();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        //TODO needs to make this admin only
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const deletedUser = await db
            .delete(customers)
            .where(eq(customers.id, userId))
            .returning();
        if (deletedUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(deletedUser[0]);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
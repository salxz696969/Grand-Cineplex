import { eq } from "drizzle-orm";
import { Response, Request } from "express";
import { db } from "../db";
import { customers } from "../db/schema/customers";

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

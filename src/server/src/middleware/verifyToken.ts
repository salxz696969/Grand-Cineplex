import { NextFunction, Request, Response } from "express";
// import { adminAuth } from "../firebase/firebaseAdmin";

// Extend Express Request interface to include 'user'
declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	// const token = req.headers.authorization?.split(" ")[1];
	// if (!token) {
	// 	return res.send("No token detected").status(401);
	// }
	// try {
	// 	const decode = await adminAuth.verifyIdToken(token);
	// 	req.user = decode;
	// 	next();
	// } catch (error) {
	// 	res.status(401).json({ message: "Unauthorized access" });
	// }
};

export default verifyToken;

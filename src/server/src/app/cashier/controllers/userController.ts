import { Response, Request } from "express";
import Customer from "../../../db/models/Customer";
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

    const userInfo = await Customer.findByPk(userId);

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userInfo);
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

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await Customer.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    await user.update({
      name,
      email,
      phone,
      password: hashedPassword,
      dateOfBirth,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, dateOfBirth } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await Customer.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Customer.create({
      name,
      email,
      phone,
      password: hashedPassword,
      dateOfBirth,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await Customer.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

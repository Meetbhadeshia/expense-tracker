import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET as string;
console.log("Jwt-secret", secretKey)
if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

// Extend Express's Request object to include user property
interface AuthRequest extends Request {
    user?: string | jwt.JwtPayload;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        req.user = decoded; // Attach user data to request
        next();
    });
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) {
        return res.status(401).json({ message: "No token, authorization denied." });
    };
    try {
        const decoded = jwt.verify(token, "");
        (req as any).user = decoded;
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    };
};
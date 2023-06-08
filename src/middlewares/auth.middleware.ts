import { Admin } from "../interfaces/admin.model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestUser } from "../interfaces/auth.interface";
import { prisma } from "../libraries/prisma";

async function authMiddleware(
  req: RequestUser,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  try {
    // Verify token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as {
      adminId: string;
    };
    const adminId = decodeToken.adminId;

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });

    if (!admin) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: "Something went wromg!" });
  }
}

export default authMiddleware;

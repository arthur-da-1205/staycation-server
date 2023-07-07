import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthDataStoredInToken, RequestUser } from '@interfaces/auth.interface';
import { prisma } from '@libraries/prisma';

async function authMiddleware(req: RequestUser, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  try {
    // Verify token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as AuthDataStoredInToken;
    const adminId = decodeToken.id;

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Something went wrong!' });
  }
}

export default authMiddleware;

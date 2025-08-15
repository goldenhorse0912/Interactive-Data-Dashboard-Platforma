import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const requester = (req as any).user;
    try {
        if (requester.role !== "admin") return res.status(401).json({ error: 'You do not have the right to access to this url' });
        else next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};

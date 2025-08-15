import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
        const payload = verifyJwt(token);
        (req as any).user = payload;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};

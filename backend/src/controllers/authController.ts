import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { signJwt } from '../utils/jwt';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("this is reqbody_______", email, password, username)
    try {
        const totalUsers = await prisma.user.count();
        if (totalUsers === 0) {
            const user = await prisma.user.create({
                data: { email, passwordHash: hashedPassword, username, role: "admin" },
            });
        }
        else {
            const existingUserByName = await prisma.user.findUnique({ where: { username } });
            if (existingUserByName) return res.status(400).json({ error: 'Same username!' });
            const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
            if (existingUserByEmail) return res.status(400).json({ error: 'Same Email!' });
            const user = await prisma.user.create({
                data: { email, passwordHash: hashedPassword, username },
            });
            res.status(201).json({ message: 'User created', userId: user.id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: 'Invalid email or password' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Invalid email or password' });

        const token = signJwt({ userId: user.id, email: user.email });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const profile = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, createdAt: true },
        });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

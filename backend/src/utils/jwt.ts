import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export const signJwt = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyJwt = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from './database';
import { CustomRequest } from "./customRequest";

const SECRET_KEY = 'secretKey';

export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

        const { rows } = await pool.query('SELECT id, username, role FROM users WHERE id = $1', [decoded.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = {
            id: rows[0].id,
            username: rows[0].username,
            role: rows[0].role,
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const isAuthor = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === 'author' || req.user?.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};

export default authenticate;

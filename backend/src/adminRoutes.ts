import express, { Request, Response } from 'express';
import pool from './database';
import { authenticate } from './authMiddleware';

const router = express.Router();

router.get('/users', authenticate, async (req: Request & { user?: { id: number; username: string; role: string }}, res: Response) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});

export default router;
import express from 'express';
import pool from './database';
import { authenticate } from './authMiddleware';

const router = express.Router();

router.post('/', authenticate, async (req: any, res) => {
    const { title, content, author_id, image_url, participant_count, expiration_date } = req.body;

    try {
        const { rows } = await pool.query(
            'INSERT INTO giveaways (title, content, author_id, image_url, participant_count, expiration_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, content, author_id, image_url, participant_count, expiration_date]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error adding giveaway', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT g.*, u.username as authorName, u.profile_picture as authorImage FROM giveaways g JOIN users u ON g.author_id = u.id');
        res.json({ giveaways: rows });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving giveaways', error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query(`
            SELECT g.*, u.username as authorName, u.profile_picture as authorImage
            FROM giveaways g
            JOIN users u ON g.author_id = u.id
            WHERE g.id = $1
        `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Giveaway not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving giveaway', error });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, content, image_url, participant_count, expiration_date } = req.body;

    try {
        const { rows } = await pool.query(
            'UPDATE giveaways SET title = $1, content = $2, image_url = $3, participant_count = $4, expiration_date = $5 WHERE id = $6 RETURNING *',
            [title, content, image_url, participant_count, expiration_date, id]
        );
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating giveaway', error });
    }
});

router.post('/join/:id', authenticate, async (req: any, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const checkParticipation = await pool.query(
            'SELECT * FROM user_giveaway WHERE user_id = $1 AND giveaway_id = $2',
            [userId, id]
        );

        if (checkParticipation.rows.length > 0) {
            return res.status(400).json({ message: 'You have already joined this giveaway.' });
        }

        await pool.query(
            'INSERT INTO user_giveaway (user_id, giveaway_id) VALUES ($1, $2)',
            [userId, id]
        );

        const result = await pool.query(
            'UPDATE giveaways SET participant_count = participant_count + 1 WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error joining giveaway', error });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM giveaways WHERE id = $1', [id]);
        res.status(200).json({ message: 'Giveaway deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting giveaway', error });
    }
});

export default router;
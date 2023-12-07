import express from 'express';
import pool from './database';
import { authenticate } from './authMiddleware';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const { title, content, author_id, image_url } = req.body;

    try {
        const { rows } = await pool.query(
            'INSERT INTO news (title, content, author_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, author_id, image_url]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error adding news', error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query(`
            SELECT n.*, u.username as authorName, u.profile_picture as authorImage
            FROM news n
            JOIN users u ON n.author_id = u.id
            WHERE n.id = $1
        `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving news', error });
    }
});


router.get('/', async (req, res) => {

    const defaultLimit = 100;

    const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : defaultLimit;

    try {
        const { rows } = await pool.query(`
            SELECT n.*, u.username as authorName, u.profile_picture as authorImage
            FROM news n
                     JOIN users u ON n.author_id = u.id
            ORDER BY n.created_at DESC
                LIMIT $1
        `, [limit]);
        res.json({ news: rows });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving news', error });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, content, image_url } = req.body;

    try {
        const { rows } = await pool.query(
            'UPDATE news SET title = $1, content = $2, image_url = $3 WHERE id = $4 RETURNING *',
            [title, content, image_url, id]
        );
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating news', error });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM news WHERE id = $1', [id]);
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting news', error });
    }
});

export default router;
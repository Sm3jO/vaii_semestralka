import express from 'express';
import pool from './database';
import { authenticate } from './authMiddleware';


const router = express.Router();

router.post('/', authenticate, async (req: any, res) => {
    const { title, content, author_id, image_url } = req.body;

    try {
        const { rows } = await pool.query(
            'INSERT INTO reviews (title, content, author_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, author_id, image_url]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query(`
            SELECT r.*, u.username as authorName, u.profile_picture as authorImage
            FROM reviews r
                     JOIN users u ON r.author_id = u.id
            WHERE r.id = $1
        `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving review', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT r.*, u.username as authorName, u.profile_picture as authorImage
            FROM reviews r
            JOIN users u ON r.author_id = u.id
        `);
        res.json({ reviews: rows });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const { rows } = await pool.query(
            'UPDATE reviews SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, id]
        );
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
});

export default router;
import express, { Response, Request } from 'express';
import pool from './database';
import { CustomRequest } from './customRequest';
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
    const defaultLimit = 100;
    const defaultPage = 1;
    const searchTerm = req.query.search?.toString().toLowerCase() ?? '';
    const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : defaultLimit;
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page, 10) : defaultPage;
    const offset = (page - 1) * limit;

    try {
        const totalQuery = await pool.query('SELECT COUNT(*) FROM giveaways');
        const totalRows = parseInt(totalQuery.rows[0].count, 10);
        const { rows } = await pool.query(`
            SELECT g.*, u.username as authorName, u.profile_picture as authorImage
            FROM giveaways g
            JOIN users u ON g.author_id = u.id
            WHERE LOWER(g.title) LIKE $1
            ORDER BY g.created_at DESC
            LIMIT $2 OFFSET $3
        `, [`%${searchTerm}%`, limit, offset]);
        res.json({ giveaways: rows, totalCount: totalRows });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving giveaways', error });
    }
});

router.get('/homepage', async (req, res) => {
    const defaultLimit = 100;
    const searchTerm = req.query.search?.toString().toLowerCase() ?? '';
    const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : defaultLimit;

    try {
        const { rows } = await pool.query(`
            SELECT g.*, u.username as authorName, u.profile_picture as authorImage
            FROM giveaways g
            JOIN users u ON g.author_id = u.id
            WHERE LOWER(g.title) LIKE $1 AND g.expiration_date > NOW()
            ORDER BY g.created_at DESC
            LIMIT $2
        `, [`%${searchTerm}%`, limit]);
        res.json({ giveaways: rows });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving giveaways for homepage', error });
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
                order by g.created_at DESC 
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
    const userId = req.user.id;

    try {

        const giveawayResult = await pool.query('SELECT expiration_date FROM giveaways WHERE id = $1', [id]);
        if (giveawayResult.rows.length === 0) {
            return res.status(404).json({ message: 'Giveaway not found' });
        }

        const giveaway = giveawayResult.rows[0];
        const now = new Date();
        const expirationDate = new Date(giveaway.expiration_date);


        if (now > expirationDate) {
            return res.status(400).json({ message: 'This giveaway has already expired.' });
        }


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
        console.error('Error joining giveaway:', error);
        res.status(500).json({ message: 'Error joining giveaway', error: (error as Error).message });
    }
});

router.delete('/:id', authenticate, async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM user_giveaway WHERE giveaway_id = $1', [id]);

        await pool.query('DELETE FROM giveaways WHERE id = $1', [id]);

        res.status(200).json({ message: 'Giveaway deleted successfully' });
    } catch (error) {
        console.error('Error deleting giveaway:', error);
        res.status(500).json({ message: 'Error deleting giveaway', error });
    }
});

export default router;
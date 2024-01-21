import express, { Request, Response } from 'express';
import pool from './database';
import { authenticate } from './authMiddleware';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const { content_id, content_type, comment_text: content, user_id, parent_comment_id } = req.body;

    try {
        const newComment = await pool.query(
            "INSERT INTO comments (content_id, content_type, content, user_id, parent_comment_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [content_id, content_type, content, user_id, parent_comment_id || null]
        );
        res.json(newComment.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
});
router.get('/:content_type/:content_id', async (req, res) => {
    const { content_type, content_id } = req.params;

    try {
        const commentsQuery = `
            SELECT c.*, u.username, u.profile_picture
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.content_type = $1 AND c.content_id = $2 AND c.parent_comment_id IS NULL
        `;
        const comments = await pool.query(commentsQuery, [content_type, content_id]);

        for (const comment of comments.rows) {
            const repliesQuery = `
                SELECT c.*, u.username, u.profile_picture
                FROM comments c
                JOIN users u ON c.user_id = u.id
                WHERE c.parent_comment_id = $1
            `;
            const replies = await pool.query(repliesQuery, [comment.id]);
            comment.replies = replies.rows;
        }

        res.json(comments.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving comments', error });
    }
});


router.post('/comments', authenticate, async (req, res) => {
    const { content_id, content_type, comment_text, user_id, parent_comment_id } = req.body;

    try {
        const newComment = await pool.query(`
            INSERT INTO comments (content_id, content_type, content, user_id, parent_comment_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `, [content_id, content_type, comment_text, user_id, parent_comment_id || null]);

        res.status(201).json(newComment.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
});


router.put('/:id', authenticate, async (req: Request & { user?: { id: number; username: string; role: string }}, res: Response) => {
    const { id } = req.params;
    const { comment_text } = req.body;

    if (!req.user) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const currentComment = await pool.query("SELECT * FROM comments WHERE id = $1", [id]);

        if (currentComment.rows.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        if (currentComment.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedComment = await pool.query(
            "UPDATE comments SET content = $1 WHERE id = $2 RETURNING *",
            [comment_text, id]
        );
        res.json(updatedComment.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
});

router.delete('/:id', authenticate, async (req: Request & { user?: { id: number; username: string; role: string }}, res: Response) => {
    const { id } = req.params;

    if (!req.user) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const comment = await pool.query("SELECT * FROM comments WHERE id = $1", [id]);

        if (comment.rows.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await pool.query("DELETE FROM comments WHERE id = $1", [id]);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
});

export default router;
import bcrypt from 'bcrypt';
import pool from "./database";
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secretKey';

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};
export const createUser = async (username: string, email: string, password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const defaultProfilePicture = 'http://localhost:3000/uploads/default-profile-picture.jpg';

    const { rows } = await pool.query(
        'INSERT INTO users (username, email, password, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, hashedPassword, defaultProfilePicture]
    );
    return rows[0];
};

export const updateUser = async (
    id: string,
    username?: string,
    email?: string,
    password?: string,
    profile_picture?: string,
    role?: string,
    bio?: string
) => {
    if (username) {
        const existingUser = await findUserByUsername(username, id);
        if (existingUser) {
            throw new Error("Username already exists");
        }
    }


    try {
    const updateFields = [];
    const queryValues = [];
    let queryCounter = 1;

    if (username) {
        updateFields.push(`username = $${queryCounter}`);
        queryValues.push(username);
        queryCounter++;
    }
    if (email) {
        updateFields.push(`email = $${queryCounter}`);
        queryValues.push(email);
        queryCounter++;
    }
    if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        updateFields.push(`password = $${queryCounter}`);
        queryValues.push(hashedPassword);
        queryCounter++;
    }
    if (profile_picture) {
        updateFields.push(`profile_picture = $${queryCounter}`);
        queryValues.push(profile_picture);
        queryCounter++;
    }
    if (role) {
        updateFields.push(`role = $${queryCounter}`);
        queryValues.push(role);
        queryCounter++;
    }

    if (bio) {
        updateFields.push(`bio = $${queryCounter}`);
        queryValues.push(bio);
        queryCounter++;
    }

        if (updateFields.length === 0) {
            throw new Error("No fields provided for update");
        }

        queryValues.push(id);
        const queryString = `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${queryCounter} RETURNING *`;

        const { rows } = await pool.query(queryString, queryValues);
        return rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};


export const updateUserProfilePicture = async (userId: string, newProfilePicture: string) => {
    try {
        const { rows } = await pool.query(
            'UPDATE users SET profile_picture = $1 WHERE id = $2 RETURNING *',
            [newProfilePicture, userId]
        );
        return rows[0];
    } catch (error) {
        throw new Error('Error updating profile picture: ');
    }
};

export const findUserById = async (id: string) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
};

export const findUserByUsername = async (username: string, excludeUserId: string) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 AND id != $2', [username, excludeUserId]);
    return rows[0];
};

export const findUserByEmail = async (email : string) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
};

export const deleteUser = async (id: string) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

export const getUserComments = async (userId: string) => {
    const { rows } = await pool.query('SELECT * FROM comments WHERE user_id = $1', [userId]);
    return rows;
};

export const getUserReviews = async (userId: string) => {
    const { rows } = await pool.query('SELECT * FROM reviews WHERE author_id = $1', [userId]);
    return rows;
};

export const getUserGiveaways = async (userId: string) => {
    const { rows } = await pool.query('SELECT * FROM giveaways WHERE author_id = $1', [userId]);
    return rows;
};

export const getUserNews = async (userId: string) => {
    const { rows } = await pool.query('SELECT * FROM news WHERE author_id = $1', [userId]);
    return rows;
};

export const getUserCommentsCount = async (userId: string) => {
    const { rows } = await pool.query('SELECT COUNT(*) FROM comments WHERE user_id = $1', [userId]);
    return rows[0].count;
};

export const getUserByUsername = async (username: string) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0];
};
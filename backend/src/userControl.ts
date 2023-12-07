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

export const updateUser = async (id: string, username: string, email: string, password: string, profile_picture: string) => {
    const saltRounds = 10;
    const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : null;

    const { rows } = await pool.query(
        'UPDATE users SET username = $1, email = $2, password = COALESCE($3, password), profile_picture = $4 WHERE id = $5 RETURNING *',
        [username, email, hashedPassword, profile_picture, id]
    );
    return rows[0];
};

export const findUserById = async (id: string) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
};

export const findUserByEmail = async (email: string) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
};

export const deleteUser = async (id: string) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};
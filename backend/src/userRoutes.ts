import express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import pool from './database';
import {
    createUser,
    findUserByEmail,
    updateUser,
    findUserById,
    deleteUser,
    generateToken,
    updateUserProfilePicture,
    getUserNews,
    getUserGiveaways,
    getUserReviews,
    getUserComments,
    getUserCommentsCount,
    getUserByUsername
} from "./userControl";
import {authenticate} from "./authMiddleware";
import { CustomRequest } from './customRequest'

const router = express.Router();



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user.id);
            res.json({ message: "Login successful", user: user, token });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during login process' });
    }
});

router.get('/users/username/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching user', error: 'Unknown error' });
        }
    }
});


router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await findUserById(id);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } else {
            res.status(404).json({ message: "User not found" });
        }

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        } else {
            res.status(500).json({ message: 'Error updating user', error: 'Unknown error' });
        }
    }

});

const registrationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': 'Passwords do not match'
        }),
});

const updateSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).optional(),
    role: Joi.string().optional(),
    profile_picture: Joi.string().optional(),
    bio: Joi.string().allow('').optional(),
});

router.post('/register', async (req, res) => {
    try {
        const { error } = registrationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { username, email, password } = req.body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const newUser = await createUser(username, email, password);

        const token = generateToken(newUser.id);

        res.status(201).json({ message: "User successfully created", user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration process', error });
    }
});

router.delete('/users/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await deleteUser(id);
        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});
router.post('/validate-password', authenticate, async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (!password || !user.password) {
            return res.status(400).json({ message: "Missing data for password validation" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ isValid: true });
        } else {
            res.json({ isValid: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error validating password' });
    }
});


router.put('/users/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { error } = updateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { username, email, password, profile_picture, role, bio } = req.body;
        const updatedUser = await updateUser(id, username, email, password, profile_picture, role, bio);
        const { password: _, ...userWithoutPassword } = updatedUser;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

router.put('/users/:id/reset-profile-picture', authenticate, async (req, res) => {
    const { id } = req.params;
    const defaultProfilePicture = "http://localhost:3000/uploads/default-profile-picture.jpg";

    try {
        const updatedUser = await updateUserProfilePicture(id, defaultProfilePicture);
        res.json({ message: "Profile picture reset successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting profile picture' });
    }
});

router.get('/user/:userId/comments', async (req, res) => {
    try {
        const userId = req.params.userId as string; // Cast to string if necessary
        const comments = await getUserComments(userId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user comments' });
    }
});

router.get('/user/:userId/reviews', async (req, res) => {
    try {
        const userId = req.params.userId as string;
        const reviews = await getUserReviews(userId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user reviews' });
    }
});

router.get('/user/:userId/giveaways', async (req, res) => {
    try {
        const userId = req.params.userId as string;
        const giveaways = await getUserGiveaways(userId);
        res.json(giveaways);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user giveaways' });
    }
});

router.get('/user/:userId/news', async (req, res) => {
    try {
        const userId = req.params.userId as string;
        const news = await getUserNews(userId);
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user news' });
    }
});

router.get('/users', (req, res) => {
    res.send('User route is working');
});

router.get('/user/:userId/comment-count', async (req, res) => {
    try {
        const userId = req.params.userId;
        const commentCount = await getUserCommentsCount(userId);
        res.json({ commentCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment count', error });
    }
});

export default router;
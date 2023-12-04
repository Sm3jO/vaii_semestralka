import express from "express";
import bcrypt from "bcrypt";
import {createUser, findUserByEmail, updateUser, findUserById, deleteUser, generateToken} from "./userControl";

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
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...userWithoutPassword } = user;
            res.json({ message: "Login successful", user: userWithoutPassword });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during login process' });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, profile_picture } = req.body;

        const updatedUser = await updateUser(id, username, email, password, profile_picture);
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});


router.get('/users', (req, res) => {
    res.send('User route is working');
});
export default router;
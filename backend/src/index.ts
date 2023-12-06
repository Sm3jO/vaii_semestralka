import express from 'express';
import pool from "./database";
import userRoutes from "./userRoutes";
import {createUser} from "./userControl";
import reviewsRoutes from "./reviewsRoutes";
import imageRoutes from "./image";
import giveawaysRoutes from "./giveawaysRoutes";
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/giveaways', giveawaysRoutes);
app.use('/api/images', imageRoutes);
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
    res.send('Hello from Express and Typescript');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
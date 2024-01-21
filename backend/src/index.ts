import express from 'express';
import pool from "./database";
import helmet from 'helmet';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import userRoutes from "./userRoutes";
import {createUser} from "./userControl";
import reviewsRoutes from "./reviewsRoutes";
import imageRoutes from "./image";
import giveawaysRoutes from "./giveawaysRoutes";
import newsRoutes from "./newsRoutes";
import commentsRoutes from "./commentsRoutes";
import adminRoutes from "./adminRoutes";


const app = express();
const port = 3000;
const cors = require('cors');

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
        if (process.env.NODE_ENV === 'production' && !req.secure) {
            res.redirect('https://' + req.headers.host + req.url);
        } else {
            next();
        }
});

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/giveaways', giveawaysRoutes);
app.use('/api/comments', commentsRoutes)
app.use('/api/images', imageRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/admin', adminRoutes)
app.get('/', (req, res) => {
    res.send('Hello from Express and Typescript');
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).json({ message: message });
};

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
import express from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req , file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 100 },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            cb(new Error('Only image files are allowed!') as any, false);
        } else {
            cb(null, true);
        }
    },
});

router.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ imageUrl: imageUrl });
    } else {
        res.status(400).send('No image uploaded.');
    }
});

export default router;
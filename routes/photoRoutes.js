const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const { describeImage } = require('../models/aiService'); // Ensure you have this function implemented

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No photo uploaded');
    }

    try {
        const photo = new Photo({
            userId: req.user._id,
            imagePath: req.file.path
        });
        await photo.save();

        // Now send this photo to OpenAI for description
        const description = await describeImage(req.file.path);

        res.json({
            message: 'Photo uploaded and described successfully',
            imagePath: req.file.path,
            description: description
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing photo', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find({ userId: req.user._id });
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error: error.message });
    }
});

module.exports = router;

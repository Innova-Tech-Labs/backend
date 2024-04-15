const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo'); 
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
    try {
        const photo = new Photo({
            userID: req.user._id, // Assuming user ID is available from session
            imagePath: req.file.path
        });
        await photo.save();
        res.status(201).send('Photo uploaded successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error uploading photo', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find({ userID: req.user._id });
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error: error.message });
    }
});

module.exports = router;

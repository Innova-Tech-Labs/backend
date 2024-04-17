const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const router = express.Router();
const { describeImage } = require('../models/aiService');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/john', async (req, res) => {
    const description = await describeImage();
    res.send("ok")
})

// Upload a photo
router.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const photo = new Photo({
            userId: req.user._id,
            imagePath: req.file.path
        });
        await photo.save();
        res.status(201).json({ message: 'Photo uploaded successfully', photo });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading photo', error: error.message });
    }
});

// Get all photos for the current user
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find({ userId: req.user._id });
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error: error.message });
    }
});

// Get a photo by ID
router.get('/:id', async (req, res) => {
    const photoId = req.params.id;
    try {
        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.json(photo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photo', error: error.message });
    }
});

// Delete a photo by ID
router.delete('/:id', async (req, res) => {
    const photoId = req.params.id;
    try {
        const deletedPhoto = await Photo.findByIdAndDelete(photoId);
        if (!deletedPhoto) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.json({ message: 'Photo deleted successfully', photo: deletedPhoto });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting photo', error: error.message });
    }
});

module.exports = router;

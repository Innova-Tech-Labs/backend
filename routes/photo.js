const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const { describeImage } = require('../models/aiService'); // Ensure you have this function implemented
const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Upload a photo and describe it
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No photo uploaded');
    }

    try {
        console.log("Upload", upload.storage.getFilename)
        console.log("req", req.file)
        const photo = new Photo({
            // userId: req.user._id,
            imagePath: req.file.path

        });
        await photo.save();

        // Now send this photo to AI for description
        let image = req.file.buffer.toString("base64")
        let imageName = req.file.originalname
        let mimeType = req.file.mimetype
        //const description = await describeImage(image, imageName, mimeType);
        const apiResponse = await describeImage(image, imageName, mimeType);

        // Extract the description content
        const description = apiResponse.choices[0].message.content;

        res.status(201).json({
            message: 'Photo uploaded and described successfully',
            imagePath: req.file.path,
            description: description
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing photo', error: error.message });
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

// Get a single photo by ID
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

const express = require('express');
const multer = require('multer');
const { checkImageAgainstItems } = require('./models/aiService');
const Photo = require('./models/Photo');
const aiService = require('./models/aiService');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No photo uploaded');
    }

    try {
        const results = await checkImageAgainstItems(req.file.buffer);
        const newPhoto = new Photo({
            userId: req.user._id, // Assuming user ID is available
            imagePath: req.file.path // Adjust according to your storage strategy
        });
        await newPhoto.save();
        res.json({
            message: 'Photo processed and saved successfully',
            results: results
        });
    } catch (error) {
        console.error('Error processing photo:', error);
        res.status(500).send('Failed to process photo');
    }
});

module.exports = router;

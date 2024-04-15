const express = require('express');
const multer = require('multer');
const router = express.Router();
const { checkImageAgainstItems } = require('../services/aiService');

// Setup multer for image uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No photo uploaded');
    }

    try {
        const results = await checkImageAgainstItems(req.file.buffer);
        res.json({
            message: 'Photo processed successfully',
            results: results
        });
    } catch (error) {
        console.error('Error processing photo:', error);
        res.status(500).send('Failed to process photo');
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Badge = require('../models/Badge');

// Award a badge
router.post('/', async (req, res) => {
    try {
        const { name, description, milestone, image, userId } = req.body;
        const newBadge = new Badge({
            name,
            description,
            milestone,
            image,
            awardedTo: userId
        });
        await newBadge.save();
        res.status(201).json({ message: 'Badge awarded successfully', badge: newBadge });
    } catch (error) {
        res.status(500).json({ message: 'Error awarding badge', error: error.message });
    }
});

// Get badges for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const badges = await Badge.find({ awardedTo: userId });
        res.json(badges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching badges', error: error.message });
    }
});

module.exports = router;

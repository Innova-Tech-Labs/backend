const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// Get all challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find().populate('createdBy', 'username');
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenges', error: error.message });
    }
});

// Join a challenge
router.put('/join/:id', async (req, res) => {
    const challengeId = req.params.id;
    const userId = req.user._id;
    try {
        const challenge = await Challenge.findByIdAndUpdate(
            challengeId,
            { $addToSet: { participants: userId } },
            { new: true }
        );
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.json({ message: 'Joined challenge successfully', challenge });
    } catch (error) {
        res.status(500).json({ message: 'Error joining challenge', error: error.message });
    }
});

module.exports = router;

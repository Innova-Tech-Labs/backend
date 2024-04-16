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

// Get all badges
router.get('/', async (req, res) => {
    try {
        const badges = await Badge.find({});
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all badges', error: error.message });
    }
});

// Get badges for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const badges = await Badge.find({ awardedTo: userId });
        res.json(badges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching badges for user', error: error.message });
    }
});

// Update a badge
router.put('/:badgeId', async (req, res) => {
    const { badgeId } = req.params;
    try {
        const updatedBadge = await Badge.findByIdAndUpdate(badgeId, req.body, { new: true });
        if (!updatedBadge) {
            return res.status(404).json({ message: 'Badge not found' });
        }
        res.json({ message: 'Badge updated successfully', badge: updatedBadge });
    } catch (error) {
        res.status(500).json({ message: 'Error updating badge', error: error.message });
    }
});

// Delete a badge
router.delete('/:badgeId', async (req, res) => {
    try {
        const deletedBadge = await Badge.findByIdAndDelete(req.params.badgeId);
        if (!deletedBadge) {
            return res.status(404).json({ message: 'Badge not found' });
        }
        res.json({ message: 'Badge deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting badge', error: error.message });
    }
});

module.exports = router;

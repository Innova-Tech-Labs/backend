const express = require('express');
const router = express.Router();
const Badge = require('../models/Badge');

// Create a middleware for error handling
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Endpoint to create a new badge
router.post('/', asyncHandler(async (req, res) => {
    const { name, description, milestone, image, userId } = req.body;
    const newBadge = new Badge({ name, description, milestone, image, awardedTo: userId });
    await newBadge.save();
    res.status(201).json({ message: 'Badge awarded successfully', badge: newBadge });
}));

// Endpoint to fetch all badges
router.get('/', asyncHandler(async (req, res) => {
    const badges = await Badge.find({});
    res.status(200).json(badges);
}));

// Endpoint to fetch badges for a specific user
router.get('/user/:userId', asyncHandler(async (req, res) => {
    const badges = await Badge.find({ awardedTo: req.params.userId });
    res.json(badges);
}));

// Endpoint to update a badge
router.put('/:badgeId', asyncHandler(async (req, res) => {
    const updatedBadge = await Badge.findByIdAndUpdate(req.params.badgeId, req.body, { new: true });
    if (!updatedBadge) {
        res.status(404).json({ message: 'Badge not found' });
    } else {
        res.json({ message: 'Badge updated successfully', badge: updatedBadge });
    }
}));

// Endpoint to delete a badge
router.delete('/:badgeId', asyncHandler(async (req, res) => {
    const deletedBadge = await Badge.findByIdAndDelete(req.params.badgeId);
    if (!deletedBadge) {
        res.status(404).json({ message: 'Badge not found' });
    } else {
        res.json({ message: 'Badge deleted successfully' });
    }
}));

module.exports = router;

const express = require('express');
const Scavenger = require('../models/Scavenger');
const router = express.Router();

// Create a new scavenger hunt
router.post('/', async (req, res) => {
    try {
        const scavenger = new Scavenger(req.body);
        await scavenger.save();
        res.status(201).json(scavenger);
    } catch (error) {
        res.status(500).json({ message: 'Error creating scavenger hunt', error: error.message });
    }
});

// Get all scavenger hunts
router.get('/', async (req, res) => {
    try {
        const scavengerHunts = await Scavenger.find();
        res.status(200).json(scavengerHunts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scavenger hunts', error: error.message });
    }
});

// Get a specific scavenger hunt by ID
router.get('/:id', async (req, res) => {
    const scavengerId = req.params.id;
    try {
        const scavengerHunt = await Scavenger.findById(scavengerId);
        if (!scavengerHunt) {
            return res.status(404).json({ message: 'Scavenger hunt not found' });
        }
        res.status(200).json(scavengerHunt);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scavenger hunt', error: error.message });
    }
});

// Update a scavenger hunt by ID
router.put('/:id', async (req, res) => {
    const scavengerId = req.params.id;
    try {
        const updatedScavenger = await Scavenger.findByIdAndUpdate(scavengerId, req.body, { new: true });
        if (!updatedScavenger) {
            return res.status(404).json({ message: 'Scavenger hunt not found' });
        }
        res.status(200).json(updatedScavenger);
    } catch (error) {
        res.status(500).json({ message: 'Error updating scavenger hunt', error: error.message });
    }
});

// Delete a scavenger hunt by ID
router.delete('/:id', async (req, res) => {
    const scavengerId = req.params.id;
    try {
        const deletedScavenger = await Scavenger.findByIdAndDelete(scavengerId);
        if (!deletedScavenger) {
            return res.status(404).json({ message: 'Scavenger hunt not found' });
        }
        res.status(200).json({ message: 'Scavenger hunt deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting scavenger hunt', error: error.message });
    }
});

module.exports = router;

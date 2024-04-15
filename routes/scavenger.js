const express = require('express');
const Scavenger = require('../models/Scavenger');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const scavenger = new Scavenger(req.body);
        await scavenger.save();
        res.status(201).json(scavenger);
    } catch (error) {
        res.status(400).json({ message: 'Error creating scavenger hunt', error: error.message });
    }
});

module.exports = router;

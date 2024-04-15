const express = require('express');
const router = express.Router();
const seedScavenger = require('../seed'); /

router.get('/', async (req, res) => {
    try {
        await seedScavenger(); 
        res.status(200).send('Scavenger data seeded successfully!');
    } catch (error) {
        console.error('Seeding failed:', error);
        res.status(500).send('Failed to seed scavenger data');
    }
});

module.exports = router;

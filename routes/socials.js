const express = require('express');
const { generateSocialShareLinks } = require('./utility/socialShare');
const Scavenger = require('../models/Scavenger');
const router = express.Router();

// Endpoint to generate social share links for a scavenger hunt
router.get('/share/:id', async (req, res) => {
  try {
    const scavengerHunt = await Scavenger.findById(req.params.id);
    if (!scavengerHunt) {
      return res.status(404).json({ message: 'Scavenger hunt not found.' });
    }

    const shareUrl = `${req.protocol}://${req.get('host')}/scavenger-hunts/${scavengerHunt._id}`;
    const shareLinks = generateSocialShareLinks(scavengerHunt.title, shareUrl);

    res.json(shareLinks);
  } catch (error) {
    res.status(500).json({ message: 'Error generating share links', error: error.message });
  }
});

module.exports = router;

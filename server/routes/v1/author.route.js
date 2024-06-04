// Import necessary modules and models
const express = require('express');
const { Personality, Quote } = require('../../models');
const router = express.Router();

// Route to fetch all personalities
router.get('/personalities', async (req, res) => {
    try {
        const personalities = await Personality.find({}, '_id name');
        res.status(200).json(personalities);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch personalities' });
    }
});

// Import necessary modules and models
router.get('/personality/:personalityName', async (req, res) => {
    const personalityName = req.params.personalityName.replace(/_/g, ' ');;

    try {
        const quotes = await Quote.find({ author: personalityName });
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quotes' });
    }
});

module.exports = router;


module.exports = router;

const express = require('express');
const { QuoteControllers } = require('../../controllers');

const router = express.Router();

router.get('/quotes', QuoteControllers.getQuotes);



router.get('/quotes/:personalityName', async (req, res) => {
    const personalityName = req.params.personalityName;

    try {
        const quotes = await Quote.find({ author: personalityName });
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quotes' });
    }
});

module.exports = router;
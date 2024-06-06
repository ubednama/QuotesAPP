const express = require('express');
const { QuoteControllers } = require('../../controllers');

const router = express.Router();

router.get('/quotes', QuoteControllers.getQuotes);
router.get('/quotes/users', QuoteControllers.getUserQuotes);
router.get('/quotes/personalities', QuoteControllers.getPersonalityQuotes);
router.get('/quotes/:personalityName', QuoteControllers.getQuotesByFullName)

module.exports = router;
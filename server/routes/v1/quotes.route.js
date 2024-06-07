const express = require('express');
const { QuoteControllers } = require('../../controllers');

const router = express.Router();

router.get('/quotes', QuoteControllers.getQuotes);
router.get('/quotes/users', QuoteControllers.getUserQuotes);
router.get('/quotes/personalities', QuoteControllers.getPersonalityQuotes);
router.get('/quotes/:personalityName', QuoteControllers.getQuotesByFullName);

//edit quotes route, post quotes route, liked quotes route, saved quotes route

module.exports = router;
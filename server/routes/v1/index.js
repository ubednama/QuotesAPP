const express = require('express');
const authRoutes = require('./auth.route')
const quoteRoutes = require('./quotes.route')
const authorRoutes = require('./author.route')

const router = express.Router();

router.use('/v1', authRoutes )
router.use('/v1', quoteRoutes)
router.use('/v1', authorRoutes)

module.exports = router;
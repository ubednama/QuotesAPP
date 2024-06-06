const express = require('express');
const authRoutes = require('./auth.route')
const quoteRoutes = require('./quotes.route')
const authorRoutes = require('./author.route')
const userRoutes = require('./user.route');
const { Auth } = require('../../utils');

const router = express.Router();

router.use('/v1', authRoutes )

router.use(Auth.verifyToken)
router.use('/v1', quoteRoutes)
// router.use('/v1', authorRoutes)
router.use('/v1', userRoutes)

module.exports = router;
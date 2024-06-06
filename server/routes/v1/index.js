const express = require('express');
const authRoutes = require('./auth.route')
const quoteRoutes = require('./quotes.route')
const authorRoutes = require('./author.route')
const userRoutes = require('./user.route');
const { ProtectRouteMiddleware } = require('../../middlewares');

const router = express.Router();

router.use('/v1', authRoutes )

router.use(ProtectRouteMiddleware.verifyToken)
router.use('/v1', quoteRoutes)
// router.use('/v1', authorRoutes)
router.use('/v1', userRoutes)

module.exports = router;
const express = require('express');
const { AuthControllers } = require('../../controllers');
const { AuthMiddlewares } = require('../../middlewares');
const router = express.Router();

router.post('/login', AuthMiddlewares.validateLoginRequest, AuthControllers.login )

router.post('/logout', AuthControllers.logout)

router.post('/signup', AuthMiddlewares.validateSingupRequest, AuthControllers.signup)


module.exports = router
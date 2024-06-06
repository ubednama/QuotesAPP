const express = require('express');const { UserControllers } = require('../../controllers');

const router = express.Router();

router.get('/users', UserControllers.getAllUsers,);
router.get('/personalities', UserControllers.getAllPersonalities);
router.get('/users/:name', UserControllers.getUserByName);
router.get('/personalities/:name', UserControllers.getPersonalityByName);

module.exports = router;
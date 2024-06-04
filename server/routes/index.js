const express = require('express');
const infoRoute = require('./info')
const v1Routes = require('./v1/index')

const router = express.Router();

router.use('/api',infoRoute)

router.use('/api', v1Routes)

module.exports = router
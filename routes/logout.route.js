var express = require('express');

var controller = require('../controllers/logout.controller.js');

var router = express.Router();

router.get('/',controller.logout);

module.exports = router;
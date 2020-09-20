var express = require('express');

var controller = require('../controllers/register.controller.js');

var router = express.Router();

router.get('/register',controller.register);

router.post('/register',controller.postRegister)

module.exports = router;
var express = require('express');

var controller = require('../controllers/auth.controller.js');

var middlewares = require('../middlewares/auth.middleware.js')

var router = express.Router();

router.get('/login',middlewares.checkLogin,controller.login);

router.post('/login',controller.postLogin)

module.exports = router;
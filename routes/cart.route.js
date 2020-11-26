var express = require('express');

var controller = require('../controllers/cart.controller.js');

var router = express.Router();

router.get('/add/:productId',controller.addToCart);

router.get('/',controller.get);

module.exports = router;
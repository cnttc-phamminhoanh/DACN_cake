var express = require('express');

var router = express.Router();

var controller = require('../controllers/product.controller.js')

router.get('/',controller.index);

router.get('/:id',controller.getid);

router.get('/search',controller.search)

module.exports = router;

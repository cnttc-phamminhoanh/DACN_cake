var express = require('express');

var multer  = require('multer');

var controller = require('../controllers/user.controller.js');

var validate = require('../validate/user.validate.js');

var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/',controller.index);

router.get('/cookie',function(req,res){
	res.cookie('users-id',41121);
	res.send('Hello');
});

router.get('/search',controller.search);

router.get('/create',controller.create);

router.get('/:id',controller.get);

router.post('/create',upload.single('avatar'),validate.postCreate,controller.postCreate);

module.exports = router;
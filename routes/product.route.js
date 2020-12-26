var express = require('express');

var multer  = require('multer');

var router = express.Router();

var controller = require('../controllers/product.controller.js')

var storage = multer.diskStorage({
	destination: function(req,res,callback){
		callback(null,'./public/images/');
	},
	filename: function(req,file,callback){
		callback(null,file.originalname);
	}
});

var upload = multer({storage: storage});

router.get('/',controller.index);

router.get('/create',controller.createProduct);

router.get('/edit',controller.listEdit);

router.get('/edit/:id',controller.edit);

router.post('/editProduct',upload.single('image'),controller.editProdut);

router.get('/delete',controller.listDelete);

router.post('/create',upload.single('image'),controller.postProduct);

router.get('/:id',controller.getid);

router.get('/search',controller.search)

module.exports = router;

var express = require('express');

var multer  = require('multer');

var router = express.Router();

var requirePermission = require('../middlewares/auth.middleware.js');

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

router.get('/search',controller.search);

router.get('/create',requirePermission.requireAdmin,controller.createProduct);

router.get('/edit',requirePermission.requireAdmin,controller.listEdit);

router.get('/edit/:id',requirePermission.requireAdmin,controller.edit);

router.post('/editProduct',requirePermission.requireAdmin,upload.single('image'),controller.editProduct);

router.get('/delete',requirePermission.requireAdmin,controller.listDelete);

router.post('/create',requirePermission.requireAdmin,upload.single('image'),controller.postProduct);

router.get('/:id',controller.getid);



module.exports = router;

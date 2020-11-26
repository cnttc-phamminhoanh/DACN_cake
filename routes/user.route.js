var express = require('express');

var multer  = require('multer');

var requirePermission = require('../middlewares/auth.middleware.js')

var controller = require('../controllers/user.controller.js');

//var validate = require('../validate/user.validate.js');

var router = express.Router();

// router.get('/cookie',function(req,res){
// 	res.cookie('users-id',41121);
// 	res.send('Hello');
// });

var storage = multer.diskStorage({
	destination: function(req,res,callback){
		callback(null,'./public/uploads/');
	},
	filename: function(req,file,callback){
		callback(null,file.originalname);
	}
});

var upload = multer({storage: storage});

router.get('/search',controller.search);

router.get('/index',requirePermission.requireAdmin,controller.index);

router.get('/index/:id',requirePermission.requireAdmin,controller.get);

router.get('/edit/:id',controller.edit);

router.post('/editUser',upload.single('avatar'),controller.editUser);

router.get('/deleteUser/:id',requirePermission.requireAdmin,controller.deleteUser);

//router.get('/create',controller.create);

//router.post('/create',upload.single('avatar'),controller.postCreate);

module.exports = router;
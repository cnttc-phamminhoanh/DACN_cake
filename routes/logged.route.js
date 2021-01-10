var express = require('express');

var controllerLogged = require('../controllers/logged.controller.js');

var requirePermission = require('../middlewares/auth.middleware.js')

//var controllerUser = require('../controllers/user.controller.js');

var router = express.Router();

// router.get('/',controllerLogged.customer);

router.get('/employee',requirePermission.requireAE,controllerLogged.employee);

router.get('/admin',requirePermission.requireAdmin,controllerLogged.admin);

module.exports = router;
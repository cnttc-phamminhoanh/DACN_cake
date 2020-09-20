var express = require('express');

var controllerLogged = require('../controllers/logged.controller.js');

var requirePermission = require('../middlewares/auth.middleware.js')

var router = express.Router();

router.get('/',requirePermission.requireCustomer,controllerLogged.customer);

router.get('/employee',requirePermission.requireEmployee,controllerLogged.employee);

router.get('/admin',requirePermission.requireAdmin,controllerLogged.admin);

module.exports = router;
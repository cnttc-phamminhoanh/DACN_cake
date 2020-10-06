var Account = require('../models/account.model.js');

var md5 = require('md5');

module.exports.logout = function(req,res,next){
	if(req.signedCookies.userId) {
	   	res.clearCookie('userId');
	    res.redirect('/');
  	}
  	else{
  		res.redirect('/');
  	}
};

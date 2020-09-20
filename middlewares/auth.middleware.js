var Account = require('../models/account.model.js');
module.exports.requireAuth = function(req,res,next){
	if(!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}
	var ObjectId = (require('mongoose').Types.ObjectId);
	//var regex = new RegExp(req.signedCookies.userId);
	Account.findOne({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		
		if(data.length <= 0)
		{
			res.redirect('/auth/login');
			return;
		}
		res.locals.user = data;
		next();
	});
};
module.exports.requireCustomer = function(req,res,next){
	if(res.locals.user.role === 0){
		next();
	}
	else{
		res.json('Not permission');
	}
};
module.exports.requireEmployee = function(req,res,next){
	if(res.locals.user.role === 1){
		next();
	}
};
module.exports.requireAdmin = function(req,res,next){
	if(res.locals.user.role === 2){
		next();
	}
	else{
		res.json('Not permission');
	}
};
var Account = require('../models/account.model.js');

module.exports.employee = function(req,res){

	var ObjectId = (require('mongoose').Types.ObjectId);

	var user = ''; 

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			user = data[0].email;
		}
		
		res.render('logged/employee.pug',{
			user : user
		});
	});	
};
module.exports.admin = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	var user = ''; 

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			user = data[0].email;
		}
		
		res.render('logged/admin.pug',{
			user : user
		});
	});	
};
module.exports.customer = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	var user = ''; 

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			user = data[0].email;
		}
		
		res.render('logged/customer.pug',{
			user : user
		});
	});	
};

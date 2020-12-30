var Account = require('../models/account.model.js');

var md5 = require('md5');

module.exports.login = function(req,res){
	res.render('auth/login.pug');
};

module.exports.postLogin = function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	
	if(email && password){
		var hashedPassword = md5(password);
		const regexE = new RegExp(email);	
		const regexP = new RegExp(hashedPassword);
		Account.find({email:regexE}).then(function(data){
			if(data.length <= 0){
				res.render('auth/login.pug',{
					error: 'Invalid email or password',
					values : req.body
				});
				return;
			}
			for(var i=0;i<=data.length;i++){
				if(data[i].email === email && data[i].password === hashedPassword){
					res.cookie('userId',data[i].id,{signed:true});
					// if(data[i].role===0){
					// 	res.redirect('/logged/');
					// }
					if(data[i].role===1){
						res.redirect('/products/');
					}
					else{
						res.redirect('/users/index');
					}
					return;
				}
				else{
					res.render('auth/login.pug',{
						error: 'Invalid email or password',
						values : req.body
					});
					return;
				}
			}			
		});
	}
};
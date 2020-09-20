var Account = require('../models/account.model.js');

var md5 = require('md5');

module.exports.register = function(req,res){
	res.render('register/register.pug');
};

module.exports.postRegister = function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	var role = 1;
	if(email&&password&&role){
		const regex = new RegExp(email);
		Account.find({email:regex}).then(function(data){
			if(data.length === 0){
				var hashedPassword = md5(password);
				var item = {
					email:email,
					password:hashedPassword,
					role:role
				};
				var data = new Account(item);
				data.save();
				res.redirect('/auth/login')
			}else{
				res.render('register/register.pug',{
					error : "User exists"
				});
			}
		});
	}
	
// 	// var user = db.get('users').find({email: email}).value();
// 	if(!user){
// 		res.render('auth/login.pug',{
// 			errors: [
// 				'Users does not exist.'
// 			],
// 			values : req.body
// 		});
// 		return;
// 	// }
// 	// var hashedPassword = md5(password);
// 	// if(user.password!==hashedPassword){
// 	// 	res.render('auth/login.pug',{
// 	// 		errors: [
// 	// 			'Wrong password.'
// 	// 		],
// 	// 		values : req.body
// 	// 	});
// 	// 	return;
// 	// }
// 	// res.cookie('userId',user.id,{signed:true});
// 	res.redirect('/users');
// };
};
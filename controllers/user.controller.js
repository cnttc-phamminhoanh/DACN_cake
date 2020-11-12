// var db = require('../db.js');	

var Account = require('../models/account.model.js');

var User = require('../models/user.model.js');

// var shortid = require('shortid');

// module.exports.index = function(req,res){
// 	res.render('users/index.pug',{
// 		users : db.get('users').value()
// 	});
// };

module.exports.search = function(req,res){
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});
	res.render('users/index.pug',{
		users : matchedUsers,
		key : q
	})
};

module.exports.create = function(req,res){
	//console.log(req.cookies);
	res.render('users/create.pug');
};

// module.exports.get = function(req,res){
// 	var id = req.params.id;
// 	var user = db.get('users').find({id: id}).value();
// 	res.render('users/view',{
// 		user : user
// 	});
// };

module.exports.get = function(req,res){

	//var id = req.params.id;

	var ObjectId = (require('mongoose').Types.ObjectId);

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			user = data[0].email;
		}
		User.find({_id:new ObjectId(req.params.id)}).then(function(data1){
			if(data1.length > 0){
				detailUser = data1[0];
			}
			Account.find({_id:new ObjectId(data1[0].account_id)}).then(function(data2){
				if(data2.length > 0){
					accountuser = data2[0];
				}
				res.render('users/view.pug',{
					user : user,
					detailUser : detailUser,
					accountuser : accountuser
				});

			});
		
		});
	});	
};

module.exports.postCreate = function(req,res){
	req.body.id = shortid.generate();
	req.body.avatar = (req.file.destination + req.file.filename).split("/").slice(2).join("/");
	db.get('users').push(req.body).write();
	res.redirect('/users');
	//console.log(res.locals);
};

module.exports.edit = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			user = data[0].email;
		}
		User.find({_id:new ObjectId(req.params.id)}).then(function(data1){
			if(data1.length > 0){
				detailUser = data1[0];
			}
			Account.find({_id:new ObjectId(data1[0].account_id)}).then(function(data2){
				if(data2.length > 0){
					accountuser = data2[0];
				}
				res.render('users/edit.pug',{
					user : user,
					detailUser : detailUser,
					accountuser : accountuser
				});

			});
		
		});
	});	
};

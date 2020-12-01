// var db = require('../db.js');

var fs = require('fs');	

var Account = require('../models/account.model.js');

var User = require('../models/user.model.js');

// var shortid = require('shortid');

module.exports.index = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	var user = ''; 

	User.find({}).then(function(data){
		userList = data;
	});
	
	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			userAc = data[0];
		}
		
		res.render('logged/admin.pug',{
			user : user,
			userList : userList
		});
		//console.log(userList);
	});	
};

module.exports.search = function(req,res){

	// var matchedUsers = db.get('users').value().filter(function(user){
	// 	return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	// });

	var ObjectId = (require('mongoose').Types.ObjectId);

	var q = req.query.q;

	var user = ''; 
	
	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			user = data[0].email;
		}
		
		User.find({}).then(function(datas){
			var matchedUsers = datas.filter(function(user){
				return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
			});

			res.render('users/search.pug',{
				user : user,
				userList : matchedUsers,
				key : q
			});

		});	
	});

};

module.exports.create = function(req,res){
	//console.log(req.cookies);
	res.render('users/create.pug');
};

module.exports.get = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			user = data[0].email;
		}
		User.find({account_id:new RegExp(req.params.id)}).then(function(data1){
			if(data1.length > 0){
				detailUser = data1[0];
			}
			Account.find({userid:new RegExp(data1[0].account_id)}).then(function(data2){
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
	//req.body.id = shortid.generate();
	req.body.avatar = (req.file.destination + req.file.filename).split("/").slice(2).join("/");
	//console.log(req.body);
	//db.get('users').push(req.body).write();
	//res.redirect('/users');
	//console.log(res.locals);
};

module.exports.edit = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		if(data.length > 0){
			user = data[0].email;
		}
		User.find({account_id:new RegExp(req.params.id)}).then(function(data1){
			if(data1.length > 0){
				detailUser = data1[0];
			}
			Account.find({userid:new RegExp(data1[0].account_id)}).then(function(data2){
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

module.exports.editUser = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	req.body.avatar = (req.file.destination + req.file.filename).split("/").slice(2).join("/");

	var userEdit = {
		name : req.body.name,
		old : req.body.old,
		address : req.body.address,
		identitycard : req.body.identitycard,
		phone : req.body.phone,
		avata : req.body.avatar
	}

	var userEmail = {
		email : req.body.email,
	}

	fs.unlink('./public/uploads/9c889dad0266fd38a477.jpg',function(err){
		if (err) throw err;
		console.log('delete success')
	});

	User.findOneAndUpdate({account_id:req.body.userid},userEdit).then(function(){
		Account.findOneAndUpdate({userid:req.body.userid},userEmail).then(function(){
			res.redirect('/logged/admin');
		});
	});
};

module.exports.deleteUser = function(req,res){
	//var ObjectId = (require('mongoose').Types.ObjectId);

	User.findOneAndRemove({account_id:req.params.id}).then(function(){
		Account.findOneAndRemove({userid:req.params.id}).then(function(){
			res.redirect('/logged/admin');
		});
	});

}

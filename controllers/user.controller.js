// var db = require('../db.js');

var fs = require('fs');	

var Account = require('../models/account.model.js');

var User = require('../models/user.model.js');

var Cart = require('../models/cart.model.js');

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

	var userEdit;

	if(req.file){
		//req.body.avatar = (req.file.destination + req.file.filename).split("/").slice(2).join("/");
		req.body.avatar = req.file.filename;

		userEdit = {
			name : req.body.name,
			old : req.body.old,
			address : req.body.address,
			identitycard : req.body.identitycard,
			phone : req.body.phone,
			avata : req.body.avatar
		}
		User.find({account_id:req.body.userid}).then(function(data){
			//console.log(data);
			fs.unlink('./public/uploads/'+data[0].avata,function(err){});
		});
	}
	else{
		userEdit = {
			name : req.body.name,
			old : req.body.old,
			address : req.body.address,
			identitycard : req.body.identitycard,
			phone : req.body.phone
		}
	}

	//console.log(userEdit);

	var userEmail = {
		email : req.body.email,
	}

	User.findOneAndUpdate({account_id:req.body.userid},userEdit).then(function(data){
		//console.log(data);
		Account.findOneAndUpdate({userid:req.body.userid},userEmail).then(function(){
			res.redirect('/logged/admin');
		});
	});
};

module.exports.deleteUser = function(req,res){
	//var ObjectId = (require('mongoose').Types.ObjectId);

	User.findOneAndRemove({account_id:req.params.id}).then(function(data){
		fs.unlink('./public/uploads/'+data.avata,function(err){});

		Account.findOneAndRemove({userid:req.params.id}).then(function(data1){
			
			Cart.findOneAndRemove({account:data1.email}).then(function(data2){
				
			});

			res.redirect('/logged/admin');
		});
	});

}

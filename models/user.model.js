var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	account_id:String,
	name:String,
	old:Number,
	address:String,
	identitycard:String,
	avata:String,
	phone:String
	},
	{
		versionKey: false
	});

var User = mongoose.model('User',userSchema,'users');

module.exports = User;
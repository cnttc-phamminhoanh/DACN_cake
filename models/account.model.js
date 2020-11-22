var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
		email:String,
		password:String,
		role:Number,
		userid:String
	},
	{
    	versionKey: false 
	});

var Account = mongoose.model('Account',accountSchema,'accounts');

module.exports = Account;
var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name:String,
	email:String,
	message:String
},
	{
    	versionKey: false 
	}
);

var Contact = mongoose.model('Contact',productSchema,'contacts');

module.exports = Contact;
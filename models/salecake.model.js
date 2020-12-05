var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name:String,
	content:String,
	price:String,
	image:String
},
	{
    	versionKey: false 
	}
);

var Salecake = mongoose.model('Salecake',productSchema,'saleCake');

module.exports = Salecake;
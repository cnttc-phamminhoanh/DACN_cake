var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name:String,
	content:String,
	price:Number,
	image:String
},
	{
    	versionKey: false 
	}
);

var Product = mongoose.model('Product',productSchema,'cakelist');

module.exports = Product;
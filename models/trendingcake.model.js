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

var Trendingcake = mongoose.model('Trendingcake',productSchema,'trendingCake');

module.exports = Trendingcake;
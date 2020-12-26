var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	product_id:String
},
	{
    	versionKey: false 
	}
);

var Trendingcake = mongoose.model('Trendingcake',productSchema,'trendingCake');

module.exports = Trendingcake;
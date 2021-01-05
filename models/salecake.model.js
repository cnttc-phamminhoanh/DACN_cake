var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	product_id:String
},
	{
    	versionKey: false 
	}
);

var Salecake = mongoose.model('Salecake',productSchema,'saleCake');

module.exports = Salecake;
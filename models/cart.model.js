var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
		product_id:String,
		quantity:Number,
		sumprice:Number,
		account_id:String
	},
	{
    	versionKey: false 
	});

var Cart = mongoose.model('Cart',accountSchema,'carts');

module.exports = Cart;
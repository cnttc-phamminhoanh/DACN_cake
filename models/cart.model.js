var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
		
		account:String,
		giohang:{
			product_id:String,
			quantity:Number
		}
			
	},
	{
    	versionKey: false 
	});

var Cart = mongoose.model('Cart',accountSchema,'carts');

module.exports = Cart;
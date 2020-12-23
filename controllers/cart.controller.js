var Cart = require('../models/cart.model.js');

var Account = require('../models/account.model.js');

var Product = require('../models/product.model.js');

module.exports.get = function(req,res,next){
	res.render('cart/cart.pug');
};

module.exports.addToCart = function(req,res,next){
	
	var ObjectId = (require('mongoose').Types.ObjectId);

	Cart.find({account:req.signedCookies.userId}).then(function(data){
			
		//console.log(data[0]);

		var tontai = false;

		var dataItem = data[0].giohang;


		for(var i=0;i<data.length;i++){

			if(dataItem[i].product_id === req.params.productId){

				dataItem[i].quantity += 1;

				dataItem[i].save();
					
				tontai = true;
			}

		}
			
		if(tontai === false){

			dataItem = new {
				product_id : req.params.productId,
				quantity : 1
			};
				
			dataItem.save();

		}

	});				

}

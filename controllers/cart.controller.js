var Cart = require('../models/cart.model.js');

var Account = require('../models/account.model.js');

var Product = require('../models/product.model.js');

module.exports.get = function(req,res,next){
	res.render('cart/cart.pug');
};

module.exports.addToCart = function(req,res,next){
	
	var ObjectId = (require('mongoose').Types.ObjectId);

	Account.find({_id:req.signedCookies.userId}).then(function(data){
		//console.log(data);

		Cart.find({account:data[0].email}).then(function(data1){
			//console.log(data1);

			var tontai = false;

			var dataItem = data1[0].giohang;

			//console.log(dataItem);

			for(var i=0;i<dataItem.length;i++){

		 		if(dataItem[i].product_id === req.params.productId){

		 			dataItem[i].quantity += 1;

		 			dataItem[i].save();
						
		 			tontai = true;
		 		}

	 		}

	 		if(tontai === false){

		 		// dataItem = new {
		 		// 	product_id : req.params.productId,
		 		// 	quantity : 1
		 		// };
					
		 		// dataItem.save();

	 		}

		});
	});
}	


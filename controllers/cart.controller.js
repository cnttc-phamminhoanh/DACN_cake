// var db = require('../db.js');

// module.exports.addToCart = function(req,res,next){
// 	var productId = req.params.productId;
// 	var sessionId = req.signedCookies.sessionId;
// 	if(!sessionId){
// 		res.redirect('/products');
// 		return;
// 	}
// 	var count = db.get('sessions')
// 	.find({id:sessionId})
// 	.get('cart.' + productId, 0)
// 	.value();

// 	db.get('sessions')
// 	.find({id:sessionId})
// 	.set('cart.' + productId, count+1)
// 	.write();
// 	res.redirect('/products');
// };

module.exports.get = function(req,res,next){
	res.render('cart/cart.pug');
};

var Cart = require('../models/cart.model.js');

var Account = require('../models/account.model.js');

var Product = require('../models/product.model.js');

module.exports.addToCart = function(req,res,next){
	var ObjectId = (require('mongoose').Types.ObjectId);
	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data){
		console.log(data);
	});
}

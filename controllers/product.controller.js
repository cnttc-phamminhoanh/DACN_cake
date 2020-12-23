//var db = require('../db.js');

var Product = require('../models/product.model.js');

module.exports.create = function (req,res){
	var name = req.body.name;
	var content = req.body.name;
	var price = req.body.name;
	var image = req.body.name;
};

module.exports.index = function(req,res){

	var page = parseInt(req.query.page) || 1;
	var perPage = 4;
	var start = (page-1)*perPage;
	var end = page*perPage;

	// var totalPage = Math.ceil((db.get('products').size().value())/perPage) || 1;  
	// res.render('products/index.pug',{
	// 	products : db.get('products').value().slice(start,end),
	// 	totalPage : totalPage
	// });

	Product.find({}).then(function(products){

		var totalPage = Math.ceil((products.length)/perPage) || 1;  
		res.render('products/index.pug',{
			products : products.slice(start,end),
			totalPage : totalPage
		});
	});

};

module.exports.search = function(req,res){
	
	var q = req.query.q;
	if (req.query.q){
		const regex = new RegExp(req.query.q,'gi');
		//const regex = new RegExp(escapeRegex(req.query.q), 'gi');
		Product.find({ name : regex }).then(function(data){
		  
			res.render('products/index.pug',{
				products : data,
				key:q
			});

		});
		return;

		// var matchedProducts = db.get('products').value().filter(function(product){
		// 	return product.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
		// });
		// res.render('products/index.pug',{
		// 	products : matchedProducts,
		// 	key : q
		// });
		// return;
	}
	else{
		res.render('products/index.pug',{
			errors: [
				'Require enter the search word.'
			]
		});
		return;
	}
	// function escapeRegex(text) {
 	//    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	// };
};

module.exports.getid = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);
	Product.find({_id:new ObjectId(req.params.id)}).then(function(data){
		res.render('products/detailProduct.pug',{
			product:data[0]
		});
	});
}